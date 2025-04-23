(async () => {
  try {
    console.log("Starting PDF generation...");

    const url = '{{url}}'
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch PDF: ${res.statusText}`);
    }

    const existingPdfBytes = await res.arrayBuffer();
    console.log("PDF fetched, bytes length:", existingPdfBytes.byteLength);

    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    console.log("PDF loaded successfully");

    const form = pdfDoc.getForm();
    console.log("PDF form accessed");

    // Attempt to set known field names - these may fail if field names don't match
    try {
      form.getTextField('employee_first_name').setText('David');
      console.log("First name field filled");
    } catch (e) {
      console.warn("First name field not found:", e.message);
    }

    try {
      form.getTextField('employee_last_name').setText('Sallusti');
      console.log("Last name field filled");
    } catch (e) {
      console.warn("Last name field not found:", e.message);
    }

    form.flatten();
    console.log("Form flattened");

    const pdfBytes = await pdfDoc.save();
    console.log("PDF saved, byte length:", pdfBytes.length);

    const base64PDF = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
    console.log("Base64 encoding complete");

    return { base64: base64PDF };
  } catch (error) {
    console.error("Error during PDF processing:", error);
    return { error: error.message };
  }
})();
