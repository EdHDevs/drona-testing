(async () => {
  const { PDFDocument } = PDFLib;

  // Fetch the blank I-9 PDF from USCIS
  const existingPdfBytes = await fetch("https://www.uscis.gov/sites/default/files/document/forms/i-9.pdf")
    .then(res => res.arrayBuffer());

  // Load the PDF
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  // Get known field names (some guesswork may be required based on PDF)
  // You'll need to inspect this via Adobe Acrobat or PDF debugging tools
  const fields = form.getFields();
  fields.forEach(f => console.log(f.getName())); // For dev use: to inspect field names

  try {
    // Example: Fill some known field names
    form.getTextField('Employee Last Name (Family Name)').setText('Sallusti');
    form.getTextField('Employee First Name (Given Name)').setText('David');
    form.getTextField('Middle Initial').setText('M');
    form.getTextField('Date of Birth (mm/dd/yyyy)').setText('01/01/1990');
  } catch (err) {
    console.error('Field not found or error filling:', err);
  }

  const pdfBytes = await pdfDoc.save();

  // Trigger download in browser
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Filled_I-9_Form.pdf';
  link.click();
})();
