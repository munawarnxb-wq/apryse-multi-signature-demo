import WebViewer from '@pdftron/webviewer'
import forge from 'node-forge'
import { UIElements, enableButton, EYE_ICON } from './ui-elements.js'

/**
 * Extracts the public certificate (DER) from a PFX/P12 file.
 * Mirrors C# X509Certificate2.Export(X509ContentType.Cert) for adding to trusted list.
 * @param {ArrayBuffer} pfxArrayBuffer - PFX file bytes
 * @param {string} password - PFX password
 * @returns {Uint8Array|null} - DER-encoded public certificate, or null on error
 */
function extractPublicCertFromPfx(pfxArrayBuffer, password) {
  try {
    const bytes = new Uint8Array(pfxArrayBuffer)
    const binaryString = String.fromCharCode.apply(null, bytes)
    const p12Asn1 = forge.asn1.fromDer(binaryString)
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password)
    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })
    const certBag = certBags[forge.pki.oids.certBag]?.[0]
    if (!certBag?.cert) return null
    const cert = certBag.cert
    const asn1Cert = forge.pki.certificateToAsn1(cert)
    const derBytes = forge.asn1.toDer(asn1Cert).getBytes()
    const derArray = new Uint8Array(derBytes.length)
    for (let i = 0; i < derBytes.length; i++) derArray[i] = derBytes.charCodeAt(i)
    return derArray
  } catch (e) {
    console.warn('Could not extract public cert from PFX:', e)
    return null
  }
}

const LOCAL_SAMPLE = '/samples/signature-sample.pdf'
const FALLBACK_DOCUMENT =
  'https://apryse.s3.us-west-1.amazonaws.com/public/files/samples/digital_signature_walkthrough.pdf'

async function getInitialDocument() {
  try {
    const res = await fetch(LOCAL_SAMPLE)
    if (!res.ok) return FALLBACK_DOCUMENT
    const ct = (res.headers.get('Content-Type') || '').toLowerCase()
    if (ct.includes('text/html')) return FALLBACK_DOCUMENT
    const buf = await res.arrayBuffer()
    const header = new TextDecoder().decode(new Uint8Array(buf, 0, 5))
    if (header !== '%PDF-') return FALLBACK_DOCUMENT
    return LOCAL_SAMPLE
  } catch {
    return FALLBACK_DOCUMENT
  }
}

let widgetsToDigitallySign = []
let digitalID = null
let hasSignedInThisSession = false
let webViewerInstance = null

const SIGNING_STEPS = {
  NEED_CERT: 'need_cert',
  NEED_ADD_FIELD: 'need_add_field',
  NEED_DRAW: 'need_draw',
  NEED_APPLY: 'need_apply',
  SIGNED: 'signed',
  ADD_MORE: 'add_more'
}

const INSTRUCTION_MESSAGES = {
  [SIGNING_STEPS.NEED_CERT]:
    'Step 1: Select a PFX file and enter the certificate password.',
  [SIGNING_STEPS.NEED_ADD_FIELD]:
    'Step 2: Add a signature field to the document (use the Signature tool from the toolbar).',
  [SIGNING_STEPS.NEED_DRAW]:
    'Step 2: Draw your signature on the signature field.',
  [SIGNING_STEPS.NEED_APPLY]:
    'Step 3: Click "Apply Approval Signature" to sign the document.',
  [SIGNING_STEPS.SIGNED]:
    'Signature applied successfully! You can verify, download, or add more signatures.',
  [SIGNING_STEPS.ADD_MORE]:
    'Add another signature field, draw your signature on it, then click "Apply Approval" to sign again.'
}

function getSignatureFieldCount() {
  const annotManager = webViewerInstance?.Core?.annotationManager
  const Annotations = webViewerInstance?.Core?.Annotations
  if (!annotManager || !Annotations) return 0
  const list = annotManager.getAnnotationsList()
  return list.filter(
    (a) => a instanceof Annotations.SignatureWidgetAnnotation
  ).length
}

function getCurrentSigningStep() {
  const hasCert = UIElements.certificateUrl instanceof File
  const hasPassword =
    UIElements.password && UIElements.password.trim().length > 0
  const hasWidgetsToSign = widgetsToDigitallySign.length > 0
  const signatureFieldCount = getSignatureFieldCount()

  if (!hasCert || !hasPassword) return SIGNING_STEPS.NEED_CERT
  if (hasWidgetsToSign) return SIGNING_STEPS.NEED_APPLY
  if (signatureFieldCount === 0) {
    return hasSignedInThisSession ? SIGNING_STEPS.ADD_MORE : SIGNING_STEPS.NEED_ADD_FIELD
  }
  return hasSignedInThisSession ? SIGNING_STEPS.ADD_MORE : SIGNING_STEPS.NEED_DRAW
}

function updateSigningFlowInstructions(forceStep = null) {
  const step = forceStep ?? getCurrentSigningStep()
  const banner = UIElements.digitalSignaturePanel.render?.querySelector(
    '#signingFlowInstructions'
  )
  if (!banner) return
  banner.textContent = INSTRUCTION_MESSAGES[step]
  banner.classList.remove('ds-step-current', 'ds-step-done')
  if (step === SIGNING_STEPS.SIGNED) {
    banner.classList.add('ds-step-done')
  } else if (
    step === SIGNING_STEPS.NEED_CERT ||
    step === SIGNING_STEPS.NEED_ADD_FIELD ||
    step === SIGNING_STEPS.NEED_DRAW ||
    step === SIGNING_STEPS.NEED_APPLY ||
    step === SIGNING_STEPS.ADD_MORE
  ) {
    banner.classList.add('ds-step-current')
  }
}
window.updateSigningFlowInstructions = updateSigningFlowInstructions

async function hasDigitalSignaturesInDoc(doc, PDFNet) {
  try {
    const it = await doc.getDigitalSignatureFieldIteratorBegin()
    for (; await it.hasNext(); it.next()) {
      const field = await it.current()
      const sigField = await PDFNet.DigitalSignatureField.createFromField(field)
      if (await sigField.hasCryptographicSignature()) return true
    }
    return false
  } catch {
    return false
  }
}

function getErrorMessage(e, fallback) {
  if (!e) return fallback
  const candidates = [
    e?.message,
    typeof e?.error === 'string' ? e.error : e?.error?.message,
    typeof e?.reason === 'string' ? e.reason : e?.reason?.message,
    e?.cause?.message,
    typeof e === 'string' ? e : null,
    e?.toString?.()
  ].filter(Boolean)
  for (const c of candidates) {
    const s = String(c).trim()
    if (s && s !== '[object Object]') {
      return s.replace(/^Error:\s*/, '')
    }
  }
  return fallback
}

function updateApplyButtonState() {
  const hasCert = UIElements.certificateUrl instanceof File
  const hasPassword =
    UIElements.password && UIElements.password.trim().length > 0
  const canSign = hasCert && hasPassword
  const applyBtn =
    UIElements.digitalSignaturePanel.render?.querySelector(
      '#applyApprovalButton'
    )
  if (applyBtn) enableButton(applyBtn, canSign)
}
window.updateApplyButtonState = updateApplyButtonState

async function initializeWebViewer() {
  const initialDoc = await getInitialDocument()
  WebViewer(
    {
      path: '/lib/webviewer',
      initialDoc,
      enableFilePicker: true,
      fullAPI: true,
      licenseKey: import.meta.env.VITE_LICENSE_KEY || 'YOUR_LICENSE_KEY'
    },
    document.getElementById('app')
  )
    .then((instance) => {
      webViewerInstance = instance
      const { UI } = instance
      const { documentViewer, Tools, Annotations, annotationManager } =
        instance.Core

      UI.setToolbarGroup('toolbarGroup-FillAndSign')

      documentViewer.addEventListener('documentLoaded', () => {
        widgetsToDigitallySign = []
        updateApplyButtonState()
        updateSigningFlowInstructions()
      })


      const tool = documentViewer.getTool(Tools.ToolNames.SIGNATURE)
      tool.setSigningMode(Tools.SignatureCreateTool.SigningModes.APPEARANCE)

      UIElements.customizeUI(instance)

      UI.openElements([UIElements.tabPanel.dataElement])
      UI.setPanelWidth(UIElements.tabPanel.dataElement, 400)

      annotationManager.addEventListener(
        'annotationChanged',
        async (annotations, action) => {
          const actionsOfInterest = ['add', 'delete']

          if (actionsOfInterest.includes(action)) {
            const signatureWidgetAnnots = annotationManager
              .getAnnotationsList()
              .filter(
                (annot) => annot instanceof Annotations.SignatureWidgetAnnotation
              )

            const widgetsWithSignatures = signatureWidgetAnnots.filter(
              (widget) =>
                widget.isSignedByAppearance() ||
                widget.getAssociatedSignatureAnnotation()
            )
            const widgetsToSign = widgetsWithSignatures.map((widget) => ({
              label: widget.getField().name
            }))

            widgetsToDigitallySign = widgetsToSign
            updateApplyButtonState()
            updateSigningFlowInstructions()
          }
        }
      )
      updateSigningFlowInstructions()
    })
    .catch((error) => {
      console.error('Failed to initialize WebViewer:', error)
    })
}

window.applyApproval = async (instance) => {
  const { UI } = instance
  const { annotationManager, SaveOptions, PDFNet, documentViewer } =
    instance.Core

  if (!(UIElements.certificateUrl instanceof File) || !UIElements.password) {
    UI.showWarningMessage({
      title: 'Certificate Required',
      message:
        'Please select a Digital ID (PFX) file and enter the certificate password before signing.'
    })
    return
  }

  digitalID = UIElements.certificateUrl

  try {
    const xfdfString = await annotationManager.exportAnnotations()
    const data = await documentViewer.getDocument().getFileData({
      xfdfString,
      flags: SaveOptions.INCREMENTAL
    })
    const filename = documentViewer.getDocument().filename

    await PDFNet.initialize()
    const signedBlob = await PDFNet.runWithCleanup(async () => {
      const doc = await PDFNet.PDFDoc.createFromBuffer(new Uint8Array(data))
      await doc.initSecurityHandler()
      const digSigFieldIterator =
        await doc.getDigitalSignatureFieldIteratorBegin()
      let foundOneDigitalSignature = false
      for (
        digSigFieldIterator;
        await digSigFieldIterator.hasNext();
        digSigFieldIterator.next()
      ) {
        const field = await digSigFieldIterator.current()
        if (await field.hasVisibleAppearance()) {
          foundOneDigitalSignature = true
          break
        }
      }
      await doc.lock()
      try {
      const widgetsToSign = JSON.parse(
        JSON.stringify(widgetsToDigitallySign)
      )

      if (!widgetsToSign.length) {
        const fieldName = 'Signature1-invisible'
        const field = await doc.fieldCreate(
          fieldName,
          PDFNet.Field.Type.e_signature
        )
        const page1 = await doc.getPage(1)
        const widgetAnnot = await PDFNet.WidgetAnnot.create(
          await doc.getSDFDoc(),
          await PDFNet.Rect.init(0, 0, 0, 0),
          field
        )
        page1.annotPushBack(widgetAnnot)
        widgetAnnot.setPage(page1)
        const widgetObj = await widgetAnnot.getSDFObj()
        widgetObj.putNumber('F', 132)
        widgetObj.putName('Type', 'Annot')
        widgetsToSign.push({ label: fieldName })
      }

      const visited = []
      let buf
      let signedCount = 0
      let setDocMDPForNext = !(await hasDigitalSignaturesInDoc(doc, PDFNet))

      for (let i = 0; i < widgetsToSign.length; i++) {
        const widgetFieldName = widgetsToSign[i].label
        let field
        if (typeof doc.getField === 'function') {
          field = await doc.getField(widgetFieldName)
        } else {
          const fieldIterator = await doc.getFieldIteratorBegin()
          for (
            ;
            await fieldIterator.hasNext();
            fieldIterator.next()
          ) {
            const f = await fieldIterator.current()
            if (
              !(await f.isValid()) ||
              (await f.getType()) !== PDFNet.Field.Type.e_signature
            ) continue
            const fieldName = await f.getName()
            if (fieldName === widgetFieldName && !visited.includes(fieldName)) {
              visited.push(fieldName)
              field = f
              break
            }
          }
        }
        if (!field) {
          throw Error('The document does not contain a signature field')
        }
        const sigField =
          await PDFNet.DigitalSignatureField.createFromField(field)
        if (await sigField.hasCryptographicSignature()) continue
        visited.push(widgetFieldName)
        signedCount++
        if (setDocMDPForNext) {
          const perm = UIElements.selectedDocumentPermission
          await sigField.setDocumentPermissions(
            PDFNet.DigitalSignatureField.DocumentPermissions[perm]
          )
          setDocMDPForNext = false
        }

        // Worker detaches buffer on postMessage transfer; get fresh buffer each time to avoid reuse
        const pfxArrayBuffer = await digitalID.arrayBuffer()
        const pfxCopy = new ArrayBuffer(pfxArrayBuffer.byteLength)
        new Uint8Array(pfxCopy).set(new Uint8Array(pfxArrayBuffer))
        await sigField.signOnNextSaveFromBuffer(
          pfxCopy,
          UIElements.password
        )
        await sigField.setLocation(UIElements.signatureInformation[0].value)
        await sigField.setReason(UIElements.signatureInformation[1].value)
        await sigField.setContactInfo(UIElements.signatureInformation[2].value)

        buf = await doc.saveMemoryBuffer(
          PDFNet.SDFDoc.SaveOptions.e_incremental
        )
      }
      if (signedCount === 0) {
        throw Error(
          'All selected signature fields are already signed. Add a new signature field and draw on it first.'
        )
      }
      return new Blob([buf], { type: 'application/pdf' })
      } finally {
        await doc.unlock()
      }
    })

    if (UIElements.addToTrustedList && digitalID) {
      const pfxBuf = await digitalID.arrayBuffer()
      const publicCertDer = extractPublicCertFromPfx(pfxBuf, UIElements.password)
      if (publicCertDer && UI.VerificationOptions?.addTrustedCertificates) {
        UI.VerificationOptions.addTrustedCertificates([publicCertDer])
      }
    }

    await UI.loadDocument(signedBlob, { filename })
    hasSignedInThisSession = true
    updateSigningFlowInstructions(SIGNING_STEPS.SIGNED)
    UI.showWarningMessage({
      title: 'Signature Applied',
      message:
        'The document has been signed successfully. You can verify the signature or download the signed PDF.'
    })
  } catch (e) {
    console.error('Apply approval failed:', e)
    const msg = getErrorMessage(
      e,
      'An error occurred while signing. Check the browser console for details.'
    )
    UI.showWarningMessage({
      title: 'Signing Failed',
      message: msg
    })
  }
}

window.downloadSignedDocument = async (instance) => {
  const { documentViewer, annotationManager, SaveOptions } = instance.Core
  const doc = documentViewer.getDocument()
  if (!doc) {
    instance.UI.showWarningMessage({
      title: 'No Document',
      message: 'No document is loaded to download.'
    })
    return
  }
  try {
    const xfdfString = await annotationManager.exportAnnotations()
    const data = await doc.getFileData({
      xfdfString,
      flags: SaveOptions.INCREMENTAL
    })
    const blob = new Blob([data], { type: 'application/pdf' })
    const filename = doc.filename || 'signed-document.pdf'
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Download failed:', e)
    const msg = getErrorMessage(e, 'Could not download the document.')
    instance.UI.showWarningMessage({
      title: 'Download Failed',
      message: msg
    })
  }
}

window.verifySignature = (instance) => {
  const { UI } = instance
  const viewerEl =
    document.getElementById('wc-app') ||
    document.querySelector('#app apryse-webviewer') ||
    document.querySelector('apryse-webviewer')
  if (!viewerEl?.shadowRoot) {
    UI.showWarningMessage({
      title: 'Verify Failed',
      message: 'Could not access the signature panel. Please try again.'
    })
    return
  }
  UI.setActiveTabInPanel({
    tabPanel: UIElements.tabPanel.dataElement,
    tabName: 'signaturePanel'
  })
  setTimeout(() => {
    try {
      const signaturePanelElement = viewerEl.shadowRoot.querySelector(
        '[data-element="signaturePanel"]'
      )
      if (!signaturePanelElement) {
        UI.showWarningMessage({
          title: 'No Signatures Found',
          message:
            'No digital signatures were found in this document. Apply a signature first, then verify.'
        })
        return
      }
      const signaturePanelButtons = Array.from(
        signaturePanelElement.querySelectorAll('button')
      )
      const signaturePanelExpandButton = signaturePanelButtons.find(
        (el) =>
          el.ariaLabel &&
          (el.ariaLabel.includes('Expand Signed by') ||
            el.ariaLabel.toLowerCase().includes('expand'))
      )
      if (signaturePanelExpandButton) {
        signaturePanelExpandButton.click()
        setTimeout(() => {
          const verifyButton = signaturePanelElement.querySelector(
            'button[aria-label="Signature Details"]'
          )
          if (verifyButton) verifyButton.click()
        }, 200)
      } else {
        UI.showWarningMessage({
          title: 'No Signatures Found',
          message:
            'No digital signatures were found in this document. Apply a signature first, then verify.'
        })
      }
    } catch (e) {
      console.error('Verify failed:', e)
      const msg = getErrorMessage(
        e,
        'Could not open the signature verification panel.'
      )
      UI.showWarningMessage({
        title: 'Verify Failed',
        message: msg
      })
    }
  }, 500)
}

window.clearDigitalIDInformation = (instance) => {
  instance.UI.showWarningMessage({
    title: 'Confirm Clearing Digital ID Information',
    message:
      'This will clear the uploaded certificate and password. Are you sure?',
    onConfirm: () => {
      UIElements.certificateUrl = null
      UIElements.password = ''
      digitalID = null

      const digitalIDFileNameLabel =
        UIElements.digitalSignaturePanel.render.querySelector(
          '#digitalIDFileNameLabel'
        )
      digitalIDFileNameLabel.textContent = ''
      const passwordField =
        UIElements.digitalSignaturePanel.render.querySelector('#inputPassword')
      passwordField.value = ''
      passwordField.type = 'password'
      passwordField.disabled = true
      const pwdToggle =
        UIElements.digitalSignaturePanel.render.querySelector('.ds-pwd-toggle')
      if (pwdToggle) {
        pwdToggle.innerHTML = EYE_ICON
        pwdToggle.title = 'Show password'
      }
      const clearBtn =
        UIElements.digitalSignaturePanel.render.querySelector(
          '#clearDigitalIDButton'
        )
      if (clearBtn) enableButton(clearBtn, false, { icon: true })
      const addTrustedCheckbox =
        UIElements.digitalSignaturePanel.render.querySelector(
          '#addToTrustedCheckbox'
        )
      if (addTrustedCheckbox) {
        addTrustedCheckbox.checked = false
        addTrustedCheckbox.disabled = true
        UIElements.addToTrustedList = false
      }
      updateApplyButtonState()
      updateSigningFlowInstructions()
    }
  })
}

initializeWebViewer()
