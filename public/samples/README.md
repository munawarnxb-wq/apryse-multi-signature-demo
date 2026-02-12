# Sample PDFs

The app loads `signature-sample.pdf` from this folder by default.

## Adding your sample PDF

1. Add a PDF file named **`signature-sample.pdf`** to this folder  
   - Or use another name and update `INITIAL_DOCUMENT` in `src/index.js`
2. The file is served at `/samples/signature-sample.pdf` when the app runs

## Options for a blank/simple PDF

- **Create a blank PDF**: Use any PDF tool (Adobe, browser "Print to PDF", LibreOffice, etc.) to create a blank page
- **Online**: Search for "create blank PDF" or "minimal PDF" generators
- **With signature fields**: Create a PDF with form fields in a PDF editor if you want pre-placed signature fields

## Recommended

For the digital signature demo, use a **plain or blank PDF** to avoid conflicting instructions from pre-built samples. A single blank page works well; the demo can add invisible signature fields when needed.
