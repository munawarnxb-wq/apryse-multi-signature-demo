// Class with static UI elements and related functions for the digital signature demo.

export const EYE_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
const EYE_OFF_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'

const TRASH_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>'

const DIGITAL_SIGNATURE_ICON = '<svg fill="#000000" width="100px" height="100px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="m 1.0324444,11.139308 c 0.0179,-0.1218 0.061,-0.2215 0.0958,-0.2215 0.0348,0 0.0633,-0.064 0.0633,-0.1428 0,-0.079 0.0321,-0.1428 0.0714,-0.1428 0.0393,0 0.0714,-0.064 0.0714,-0.1427 0,-0.079 0.0321,-0.1428 0.0714,-0.1428 0.0393,0 0.0714,-0.047 0.0714,-0.1045 0,-0.058 0.08,-0.2479001 0.17776,-0.4230001 0.12606,-0.2258 0.16557,-0.3794 0.13583,-0.528 -0.0254,-0.1269 0.002,-0.2942 0.0687,-0.4236 0.0608,-0.1177 0.18066,-0.4193 0.26627,-0.6702 0.0856,-0.251 0.17774,-0.4885 0.20472,-0.5277 0.027,-0.039 0.0925,-0.216 0.14571,-0.3927 0.0532,-0.1766 0.1232,-0.3517 0.15563,-0.389 0.0324,-0.037 0.059,-0.1417 0.059,-0.232 0,-0.09 0.0321,-0.1642 0.0714,-0.1642 0.0393,0 0.0714,-0.094 0.0714,-0.21 0,-0.1154 0.0321,-0.2298 0.0714,-0.254 0.0393,-0.024 0.073,-0.099 0.0749,-0.1649 0.002,-0.066 0.16547,-0.2492 0.36338,-0.4062 0.1979,-0.1571 0.43577,-0.3579 0.5286,-0.4462 0.0928,-0.088 0.1866,-0.1606 0.20838,-0.1606 0.0218,0 0.13637,-0.093 0.25466,-0.2056 0.11829,-0.113 0.3509,-0.2977 0.51691,-0.4104 0.16601,-0.1128 0.31254,-0.2291 0.32563,-0.2585 0.0131,-0.029 0.0683,-0.053 0.12276,-0.053 0.0544,0 0.21335,-0.064 0.35316,-0.1428 0.26925,-0.1512 0.60679,-0.1909 0.60679,-0.071 0,0.039 0.0421,0.071 0.0936,0.071 0.0515,0 0.15589,0.058 0.23201,0.1285 0.24872,0.231 0.37942,0.24 0.55068,0.038 0.30396,-0.3586 1.0957,-1.1308 1.25041,-1.2194 0.18638,-0.1068 0.51461,-0.1182 0.51461,-0.018 0,0.039 0.043,0.071 0.0956,0.071 0.12754,0 0.26131,0.3072 0.26131,0.6002 0,0.2369 -0.24982,0.6817 -0.50955,0.9073 -0.0731,0.063 -0.13294,0.139 -0.13294,0.1677 0,0.029 -0.0964,0.1422 -0.21416,0.2523 -0.23429,0.2188 -0.26247,0.3229 -0.12217,0.4512 0.18171,0.1662 0.89017,0.5482 1.01669,0.5482 0.0577,0 0.10491,0.029 0.10491,0.063 0,0.035 0.20949,0.1202 0.46554,0.1895 0.4572796,0.1237 0.4683696,0.1234 0.6246396,-0.018 0.1522,-0.1379 0.20395,-0.1411 1.19421,-0.074 0.56932,0.038 1.0438,0.078 1.05441,0.087 0.0106,0.01 0.0719,0.2706 0.13625,0.5806 0.22137,1.0669 0.1397,2.7256 -0.19548,3.9704001 l -0.0726,0.2698 -1.10376,0 -1.10375,0 0,-0.2142 c 0,-0.1178 -0.0321,-0.2142 -0.0714,-0.2142 -0.0393,0 -0.0714,-0.068 -0.0714,-0.1504 0,-0.1163 -0.0283,-0.1381 -0.12493,-0.096 -0.0687,0.03 -0.2373696,0.067 -0.3747896,0.083 -0.13742,0.016 -0.31799,0.063 -0.40128,0.1034 -0.15948,0.078 -0.59017,0.053 -1.4191,-0.084 -0.56756,-0.093 -0.48797,-0.091 -1.12627,-0.028 -0.26608,0.026 -0.50088,0.076 -0.52177,0.1096 -0.0539,0.087 -1.79571,0.078 -1.84994,-0.01 -0.0243,-0.039 -0.15276,-0.071 -0.28555,-0.071 -0.13279,0 -0.26128,-0.032 -0.28555,-0.071 -0.0243,-0.039 -0.15836,-0.071 -0.29798,-0.071 -0.20152,0 -0.30517,0.055 -0.50271,0.2677 -0.13687,0.1473 -0.29749,0.34 -0.35693,0.4284 -0.0594,0.088 -0.16674,0.1606 -0.23843,0.1606 -0.0717,0 -0.15021,0.032 -0.17447,0.071 -0.0243,0.039 -0.10154,0.071 -0.17172,0.071 -0.0702,0 -0.22087,0.046 -0.33487,0.1034 -0.11401,0.057 -0.33873,0.1244 -0.49939,0.1501 l -0.29211,0.047 0.0325,-0.2215 z m 0.83725,-0.2929 c 0.0243,-0.039 0.10648,-0.071 0.18268,-0.071 0.0762,0 0.13857,-0.032 0.13857,-0.071 0,-0.039 0.0482,-0.071 0.10708,-0.071 0.0589,0 0.10708,-0.048 0.10708,-0.1065 0,-0.1314 -0.28157,-0.4646 -0.39263,-0.4646 -0.11106,0 -0.39263,0.3332 -0.39263,0.4646 0,0.059 -0.0321,0.1065 -0.0714,0.1065 -0.0393,0 -0.0714,0.064 -0.0714,0.1428 0,0.1038 0.0476,0.1428 0.17426,0.1428 0.0958,0 0.19411,-0.032 0.21837,-0.071 z m 9.7914796,-0.4796 c 0.56959,-0.044 0.51279,0.02 0.6796,-0.7697001 0.10998,-0.5207 0.15529,-2.1091 0.0628,-2.2016 -0.0416,-0.042 -0.0756,-0.1661 -0.0756,-0.2766 0,-0.1106 -0.0399,-0.329 -0.0888,-0.4855 l -0.0888,-0.2844 -0.54608,0 c -0.62148,0 -0.64971,0.026 -0.55725,0.5046 0.11336,0.5873 0.075,1.9136 -0.0772,2.6663 -0.15299,0.7568001 -0.13618,1.0112001 0.0617,0.9332001 0.0652,-0.026 0.34848,-0.064 0.62959,-0.086 z M 6.1529444,9.9283079 c 0.15705,-0.042 0.48897,-0.1306 0.73759,-0.1971 0.4275,-0.1144 0.48566,-0.1141 1.07082,0.01 0.34032,0.07 0.81151,0.1273 1.04709,0.1279 0.50257,0.001 1.3830896,-0.1952 1.5309896,-0.3415 0.10718,-0.1061 0.23238,-0.8318 0.23976,-1.3898 0.005,-0.3722 -0.0687,-0.9074 -0.18342,-1.3327 -0.0786,-0.2915 -0.0876,-0.2983 -0.44116,-0.3348 -0.5742096,-0.059 -0.8963196,-0.1281 -0.8963196,-0.1915 0,-0.032 -0.0723,-0.082 -0.16062,-0.1096 -0.0883,-0.028 -0.36468,-0.1746 -0.61409,-0.326 -0.24941,-0.1514 -0.48231,-0.2753 -0.51756,-0.2753 -0.0352,0 -0.0641,-0.032 -0.0641,-0.071 0,-0.1875 -0.27918,-0.03 -0.65538,0.3706 -0.37178,0.3956 -0.41543,0.474 -0.41543,0.7454 0,0.1668 -0.0321,0.3232 -0.0714,0.3474 -0.0393,0.024 -0.0714,0.1069 -0.0714,0.1837 0,0.1551 -0.11414,0.3784 -0.30339,0.5936 -0.0687,0.078 -0.12493,0.1681 -0.12493,0.1999 0,0.1 0.34485,0.063 0.75135,-0.079 0.38822,-0.1364 0.39085,-0.1364 0.39085,0 0,0.078 -0.0993,0.2321 -0.22063,0.3429 l -0.22062,0.2015 -1.10194,0 c -0.7526,0 -1.12849,0.023 -1.18571,0.08 -0.0461,0.046 -0.17371,0.084 -0.28365,0.084 -0.10994,0 -0.19989,0.032 -0.19989,0.071 0,0.039 -0.0642,0.071 -0.14277,0.071 -0.0785,0 -0.14278,0.027 -0.14278,0.059 0,0.033 -0.0779,0.101 -0.17302,0.152 -0.18219,0.098 -0.28332,0.3465 -0.21403,0.5271 0.0461,0.1201 0.52553,0.3324 0.75054,0.3324 0.0805,0 0.19232,-0.046 0.24841,-0.1019 0.1151,-0.1151 0.14054,-0.6833 0.0306,-0.6833 -0.0393,0 -0.0714,-0.064 -0.0714,-0.1428 0,-0.1852 0.0407,-0.18 0.25311,0.033 0.12743,0.1274 0.17522,0.2528 0.17522,0.4598 0,0.1565 -0.0321,0.3044 -0.0714,0.3287 -0.13127,0.081 -0.0734,0.2215 0.12493,0.3028 0.22116,0.091 0.76798,0.071 1.19574,-0.043 z m -3.49888,-1.0793 c 0.20573,-0.3259 0.22956,-0.6039 0.0658,-0.7677 -0.0966,-0.097 -0.12355,-0.099 -0.1804,-0.013 -0.0368,0.055 -0.0861,0.1892 -0.10953,0.2971 -0.0235,0.108 -0.0656,0.1964 -0.0937,0.1964 -0.0642,0 -0.2167,0.3289 -0.2167,0.4673 0,0.063 0.0699,0.1038 0.17757,0.1038 0.12939,0 0.22625,-0.077 0.35694,-0.2842 z m 0.48514,0.048 c 0.26307,-0.271 0.4081,-0.5016 0.4081,-0.6489 0,-0.056 0.0241,-0.1128 0.0535,-0.1259 0.0294,-0.013 0.13385,-0.1992 0.23201,-0.4135 0.0982,-0.2144 0.31499,-0.5268 0.48186,-0.6942 0.16687,-0.1674 0.3034,-0.321 0.3034,-0.3412 0,-0.068 0.24679,-0.3411 1.08866,-1.2037 0.46134,-0.4727 0.8388,-0.888 0.8388,-0.9229 0,-0.1533 -0.39705,-0.4103 -0.63371,-0.4103 -0.16776,0 -0.63626,0.2586 -0.80241,0.443 -0.0635,0.071 -0.14859,0.1281 -0.18909,0.1281 -0.0405,0 -0.23766,0.1606 -0.43816,0.3569 -0.20049,0.1963 -0.3832,0.3569 -0.40602,0.3569 -0.0846,0 -0.78643,0.7789 -0.8785,0.9749 -0.0525,0.1117 -0.12374,0.2588 -0.15842,0.327 -0.0347,0.068 -0.0631,0.1726 -0.0631,0.232 0,0.059 -0.0321,0.1081 -0.0714,0.1081 -0.0393,0 -0.0714,0.094 -0.0714,0.2082 0,0.1145 -0.0388,0.2211 -0.0862,0.2369 -0.0576,0.019 -0.0357,0.083 0.0658,0.1919 0.22734,0.2441 0.34549,0.5655 0.24483,0.6662 -0.0449,0.045 -0.0817,0.1537 -0.0817,0.2417 0,0.088 -0.0321,0.1798 -0.0714,0.2041 -0.0732,0.045 -0.10182,0.3212 -0.0333,0.3212 0.0209,0 0.1414,-0.1064 0.2677,-0.2365 z m 2.72831,-1.0663 c 0.13638,-0.088 0.24836,-0.2008 0.24885,-0.2499 4.8e-4,-0.049 0.033,-0.089 0.0723,-0.089 0.0393,0 0.0714,-0.064 0.0714,-0.1428 0,-0.079 0.0321,-0.1427 0.0714,-0.1427 0.0393,0 0.0714,-0.08 0.0714,-0.1785 0,-0.2216 -0.0932,-0.2288 -0.23214,-0.018 -0.0582,0.088 -0.26617,0.3284 -0.4622,0.5335 -0.19602,0.2051 -0.3395,0.3899 -0.31884,0.4105 0.0753,0.075 0.23533,0.034 0.4779,-0.123 z"/></svg>'

const PANEL_STYLES = `
  .ds-panel { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.5; color: #1e293b; padding: 16px; }
  .ds-panel .ds-intro { color: #64748b; font-size: 13px; margin-bottom: 16px; }
  .ds-panel .ds-section { margin-bottom: 20px; }
  .ds-panel .ds-section-title { font-size: 13px; font-weight: 600; color: #334155; margin: 0 0 6px 0; }
  .ds-panel .ds-section-desc { color: #64748b; font-size: 12px; margin: 0 0 10px 0; }
  .ds-panel .ds-divider { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }
  .ds-panel .ds-input { width: 100%; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
  .ds-panel .ds-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.15); }
  .ds-panel .ds-input:disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }
  .ds-panel .ds-select { width: 100%; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; background: white; cursor: pointer; }
  .ds-panel .ds-select:focus { outline: none; border-color: #3b82f6; }
  .ds-panel .ds-label { display: block; font-size: 12px; font-weight: 500; color: #475569; margin-bottom: 4px; }
  .ds-panel .ds-btn { padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all 0.15s; }
  .ds-panel .ds-btn:disabled { cursor: not-allowed; opacity: 0.6; }
  .ds-panel .ds-btn-primary { background: #3b82f6; color: white; }
  .ds-panel .ds-btn-primary:hover:not(:disabled) { background: #2563eb; }
  .ds-panel .ds-btn-secondary { background: #f1f5f9; color: #475569; }
  .ds-panel .ds-btn-secondary:hover:not(:disabled) { background: #e2e8f0; }
  .ds-panel .ds-btn-group { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
  .ds-panel .ds-btn-group .ds-input { margin: 0; flex: 1; min-width: 0; }
  .ds-panel .ds-spacer { margin-bottom: 12px; }
  .ds-panel .ds-actions { display: flex; flex-direction: column; gap: 8px; }
  .ds-panel .ds-filename { font-size: 12px; color: #64748b; font-style: italic; }
  .ds-panel .ds-input-wrap { position: relative; }
  .ds-panel .ds-input-wrap .ds-input { padding-right: 36px; }
  .ds-panel .ds-input-wrap .ds-pwd-toggle { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 4px; color: #64748b; display: flex; align-items: center; justify-content: center; }
  .ds-panel .ds-input-wrap .ds-pwd-toggle:hover { color: #334155; }
  .ds-panel .ds-clear-wrap { margin-top: 16px; display: flex; justify-content: flex-end; }
  .ds-panel .ds-btn-icon { display: inline-flex; align-items: center; gap: 6px; }
  .ds-panel .ds-btn-icon svg { flex-shrink: 0; }
  .ds-panel .ds-info-hint { font-size: 11px; color: #64748b; margin-top: 6px; line-height: 1.4; }
  .ds-panel .ds-info-hint a { color: #3b82f6; text-decoration: none; }
  .ds-panel .ds-info-hint a:hover { text-decoration: underline; }
  .ds-panel .ds-instruction-banner { background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px; font-size: 14px; line-height: 1.5; color: #1e40af; }
  .ds-panel .ds-instruction-banner.ds-step-current { background: #dbeafe; font-weight: 600; }
  .ds-panel .ds-instruction-banner.ds-step-done { background: #ecfdf5; border-color: #10b981; color: #065f46; }
  .ds-panel .ds-checkbox-wrap { display: flex; align-items: flex-start; gap: 10px; margin-top: 10px; cursor: pointer; }
  .ds-panel .ds-checkbox-wrap input { margin-top: 3px; flex-shrink: 0; width: 18px; height: 18px; cursor: pointer; accent-color: #3b82f6; }
  .ds-panel .ds-checkbox-wrap .ds-checkbox-label { font-size: 13px; color: #475569; line-height: 1.4; user-select: none; }
`

export function enableButton(button, state, options = {}) {
  button.disabled = !state
  button.className = state ? 'ds-btn ds-btn-primary' : 'ds-btn ds-btn-secondary'
  if (options.icon) button.classList.add('ds-btn-icon')
}

export class UIElements {
  static viewerPanels = null
  static tabPanel = {
    handle: null,
    dataElement: 'tabPanel'
  }
  static digitalSignaturePanel = {
    handle: null,
    dataElement: 'digitalSignaturePanel',
    render: null
  }
  static password = 'password'
  static signatureInformation = [
    { id: 'Location', label: 'Location', value: 'Vancouver, BC, Canada' },
    { id: 'Reason', label: 'Reason', value: 'Cryptographic signature demo' },
    { id: 'ContactInfo', label: 'Contact Information', value: 'apryse.com' }
  ]
  static certificateUrl = null
  static selectedDocumentPermission = 'e_annotating_formfilling_signing_allowed'
  static addToTrustedList = false

  static customizeUI = (instance) => {
    const { UI } = instance
    UI.closeElements([UIElements.tabPanel.dataElement])
    UIElements.viewerPanels = UI.getPanels()
    UIElements.tabPanel.handle = UIElements.viewerPanels.find(
      (panel) => panel.dataElement === UIElements.tabPanel.dataElement
    )
    UIElements.RegisterDigitalSignaturePanel(instance)
    UIElements.digitalSignaturePanel.handle = {
      render: UIElements.digitalSignaturePanel.dataElement
    }
    UIElements.tabPanel.handle.panelsList = [
      UIElements.digitalSignaturePanel.handle,
      ...UIElements.tabPanel.handle.panelsList
    ]
  }

  static RegisterDigitalSignaturePanel = (instance) => {
    UIElements.digitalSignaturePanel.render =
      UIElements.createDigitalSignaturePanelElements(instance)
    instance.UI.addPanel({
      dataElement: UIElements.digitalSignaturePanel.dataElement,
      location: 'left',
      icon: DIGITAL_SIGNATURE_ICON,
      title: 'Digital Signature',
      render: () => UIElements.digitalSignaturePanel.render
    })
  }

  static createDigitalSignaturePanelElements = (instance) => {
    const panelDiv = document.createElement('div')
    panelDiv.id = 'digitalSignaturePanel'
    panelDiv.className = 'ds-panel'

    const styleEl = document.createElement('style')
    styleEl.textContent = PANEL_STYLES
    panelDiv.appendChild(styleEl)

    const instructionBanner = document.createElement('div')
    instructionBanner.id = 'signingFlowInstructions'
    instructionBanner.className = 'ds-instruction-banner'
    instructionBanner.setAttribute('aria-live', 'polite')
    panelDiv.appendChild(instructionBanner)

    const intro = document.createElement('p')
    intro.className = 'ds-intro'
    intro.textContent = 'Follow the steps above. You can add multiple signature fields and sign each one. No certificates are stored server-side.'
    panelDiv.appendChild(intro)

    const dividerDiv = document.createElement('hr')
    dividerDiv.className = 'ds-divider'
    panelDiv.appendChild(dividerDiv)

    const digitalIDDiv = document.createElement('div')
    digitalIDDiv.id = 'digitalIDDiv'
    digitalIDDiv.className = 'ds-section'
    const digitalIDDivTitle = document.createElement('h3')
    digitalIDDivTitle.className = 'ds-section-title'
    digitalIDDivTitle.textContent = 'Digital ID (Required)'
    digitalIDDiv.appendChild(digitalIDDivTitle)
    const digitalIDDesc = document.createElement('p')
    digitalIDDesc.className = 'ds-section-desc'
    digitalIDDesc.textContent = 'You must provide a PFX certificate and password to sign. No certificates are stored or held by this application.'
    digitalIDDiv.appendChild(digitalIDDesc)
    panelDiv.appendChild(digitalIDDiv)

    const digitalIDFileButton = document.createElement('button')
    digitalIDFileButton.textContent = 'Select Digital ID File'
    enableButton(digitalIDFileButton, true)

    const digitalIDFileNameLabel = document.createElement('span')
    digitalIDFileNameLabel.id = 'digitalIDFileNameLabel'
    digitalIDFileNameLabel.className = 'ds-filename'
    digitalIDFileNameLabel.textContent = ''

    const passwordField = document.createElement('input')
    passwordField.id = 'inputPassword'
    passwordField.className = 'ds-input'
    passwordField.type = 'password'
    passwordField.disabled = true
    passwordField.placeholder = 'Enter certificate password'
    passwordField.value = ''
    digitalIDFileButton.onclick = () => {
      const inputFile = document.createElement('input')
      inputFile.id = 'inputFile'
      inputFile.type = 'file'
      inputFile.style.display = 'none'
      inputFile.accept = '.pfx'
      inputFile.onchange = (e) => {
        UIElements.certificateUrl = e.target.files[0]
        if (UIElements.certificateUrl !== null) {
          enableButton(clearDigitalIDButton, true, { icon: true })
          digitalIDFileNameLabel.textContent = UIElements.certificateUrl.name
          passwordField.disabled = false
          passwordField.value = ''
          addTrustedCheckbox.disabled = false
          window.updateApplyButtonState?.()
          window.updateSigningFlowInstructions?.()
        }
      }
      inputFile.click()
    }

    panelDiv.appendChild(digitalIDFileButton)
    const spacer1 = document.createElement('div')
    spacer1.className = 'ds-spacer'
    spacer1.appendChild(digitalIDFileNameLabel)
    panelDiv.appendChild(spacer1)
    const pwdLabel = document.createElement('label')
    pwdLabel.className = 'ds-label'
    pwdLabel.textContent = 'Digital ID Password'
    panelDiv.appendChild(pwdLabel)
    const pwdWrap = document.createElement('div')
    pwdWrap.className = 'ds-input-wrap'
    pwdWrap.appendChild(passwordField)
    const pwdToggle = document.createElement('button')
    pwdToggle.type = 'button'
    pwdToggle.className = 'ds-pwd-toggle'
    pwdToggle.title = 'Show password'
    pwdToggle.innerHTML = EYE_ICON
    pwdToggle.onclick = () => {
      const isHidden = passwordField.type === 'password'
      passwordField.type = isHidden ? 'text' : 'password'
      pwdToggle.innerHTML = isHidden ? EYE_OFF_ICON : EYE_ICON
      pwdToggle.title = isHidden ? 'Hide password' : 'Show password'
    }
    pwdWrap.appendChild(pwdToggle)
    panelDiv.appendChild(pwdWrap)

    const addTrustedWrap = document.createElement('label')
    addTrustedWrap.className = 'ds-checkbox-wrap'
    addTrustedWrap.htmlFor = 'addToTrustedCheckbox'
    const addTrustedCheckbox = document.createElement('input')
    addTrustedCheckbox.id = 'addToTrustedCheckbox'
    addTrustedCheckbox.type = 'checkbox'
    addTrustedCheckbox.checked = UIElements.addToTrustedList
    addTrustedCheckbox.disabled = true
    addTrustedWrap.appendChild(addTrustedCheckbox)
    const addTrustedLabel = document.createElement('span')
    addTrustedLabel.className = 'ds-checkbox-label'
    addTrustedLabel.textContent =
      'Add certificate as trusted (signatures will appear green in Apryse validation)'
    addTrustedWrap.appendChild(addTrustedLabel)
    panelDiv.appendChild(addTrustedWrap)

    addTrustedCheckbox.addEventListener('change', () => {
      UIElements.addToTrustedList = addTrustedCheckbox.checked
    })

    const clearWrap = document.createElement('div')
    clearWrap.className = 'ds-clear-wrap'
    const clearDigitalIDButton = document.createElement('button')
    clearDigitalIDButton.id = 'clearDigitalIDButton'
    clearDigitalIDButton.innerHTML = `${TRASH_ICON}<span>Clear Digital ID Information</span>`
    enableButton(clearDigitalIDButton, false, { icon: true })
    clearDigitalIDButton.onclick = () => {
      window.clearDigitalIDInformation(instance)
    }
    clearWrap.appendChild(clearDigitalIDButton)
    panelDiv.appendChild(clearWrap)
    panelDiv.appendChild(dividerDiv.cloneNode())

    const docPermDiv = document.createElement('div')
    docPermDiv.id = 'docPermDiv'
    docPermDiv.className = 'ds-section'
    const docPermTitle = document.createElement('h3')
    docPermTitle.className = 'ds-section-title'
    docPermTitle.textContent = 'Document Permissions (First Signer Only)'
    docPermDiv.appendChild(docPermTitle)
    const docPermDesc = document.createElement('p')
    docPermDesc.className = 'ds-section-desc'
    docPermDesc.textContent = 'If you are the first signer, choose what changes are allowed after signing:'
    docPermDiv.appendChild(docPermDesc)
    panelDiv.appendChild(docPermDiv)

    const permSelect = document.createElement('select')
    permSelect.id = 'documentPermissionSelect'
    permSelect.className = 'ds-select'
    const permOptions = [
      { value: 'e_no_changes_allowed', label: 'No changes allowed' },
      { value: 'e_formfilling_signing_allowed', label: 'Form filling and signing allowed' },
      { value: 'e_annotating_formfilling_signing_allowed', label: 'Annotations, form filling, and signing allowed' },
      { value: 'e_unrestricted', label: 'Unrestricted' }
    ]
    permOptions.forEach((opt) => {
      const option = document.createElement('option')
      option.value = opt.value
      option.textContent = opt.label
      if (opt.value === UIElements.selectedDocumentPermission) {
        option.selected = true
      }
      permSelect.appendChild(option)
    })
    permSelect.addEventListener('change', () => {
      UIElements.selectedDocumentPermission = permSelect.value
    })
    docPermDiv.appendChild(permSelect)
    const docPermHint = document.createElement('p')
    docPermHint.className = 'ds-info-hint'
    docPermHint.innerHTML = 'The first signer sets these rules (DocMDP). Subsequent signers can only add signatures within those limits. <a href="https://apryse.com/blog/multiple-digital-signature-on-one-document" target="_blank" rel="noopener">Learn more</a>'
    docPermDiv.appendChild(docPermHint)
    panelDiv.appendChild(docPermDiv)
    panelDiv.appendChild(dividerDiv.cloneNode())

    const signatureInfoDiv = document.createElement('div')
    signatureInfoDiv.id = 'signatureInfoDiv'
    signatureInfoDiv.className = 'ds-section'
    const signatureInfoDivTitle = document.createElement('h3')
    signatureInfoDivTitle.className = 'ds-section-title'
    signatureInfoDivTitle.textContent = 'Signature Information (Optional)'
    signatureInfoDiv.appendChild(signatureInfoDivTitle)
    panelDiv.appendChild(signatureInfoDiv)

    UIElements.signatureInformation.forEach((info) => {
      const label = document.createElement('label')
      label.className = 'ds-label'
      label.textContent = info.label
      panelDiv.appendChild(label)
      const inputField = document.createElement('input')
      inputField.id = `input${info.id}`
      inputField.className = 'ds-input'
      inputField.type = 'text'
      inputField.value = info.value
      inputField.addEventListener('input', () => {
        info.value = inputField.value.trim()
      })
      panelDiv.appendChild(inputField)
      const sp = document.createElement('div')
      sp.className = 'ds-spacer'
      panelDiv.appendChild(sp)
    })

    const applyApprovalButton = document.createElement('button')
    applyApprovalButton.id = 'applyApprovalButton'
    applyApprovalButton.textContent = 'Apply Approval Signature'
    enableButton(applyApprovalButton, false)
    passwordField.addEventListener('input', () => {
      UIElements.password = passwordField.value
      window.updateApplyButtonState?.()
      window.updateSigningFlowInstructions?.()
    })
    applyApprovalButton.onclick = () => {
      window.applyApproval(instance)
      enableButton(verifySignatureButton, true)
    }

    const verifySignatureButton = document.createElement('button')
    verifySignatureButton.textContent = 'Verify Signature'
    enableButton(verifySignatureButton, false)
    verifySignatureButton.onclick = () => window.verifySignature(instance)

    const downloadButton = document.createElement('button')
    downloadButton.id = 'downloadSignedButton'
    downloadButton.textContent = 'Download Signed PDF'
    enableButton(downloadButton, true)
    downloadButton.onclick = () => window.downloadSignedDocument(instance)

    const actionsWrap = document.createElement('div')
    actionsWrap.className = 'ds-actions'
    actionsWrap.appendChild(applyApprovalButton)
    actionsWrap.appendChild(verifySignatureButton)
    actionsWrap.appendChild(downloadButton)
    panelDiv.appendChild(actionsWrap)

    return panelDiv
  }
}
