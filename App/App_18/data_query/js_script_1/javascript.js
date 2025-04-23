
(async () => {
  const url = 'https://www.uscis.gov/sites/default/files/document/forms/i-9.pdf';
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  form.getTextField('employee_first_name').setText('David');
  form.getTextField('employee_last_name').setText('Sallusti');
  // etc...

  form.flatten();
  const pdfBytes = await pdfDoc.save();
  const base64PDF = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));

  return { base64: base64PDF };
})();
