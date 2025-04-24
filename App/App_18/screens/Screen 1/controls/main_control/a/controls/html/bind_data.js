<!DOCTYPE html>
<html>
<head>
  <title>Fill I-9 PDF</title>
  <script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
</head>
<body>
  <button onclick="fillPDF()">Fill & Download I-9</button>

  <script>
    async function fillPDF() {
      const url = 'https://cors-anywhere.herokuapp.com/https://www.uscis.gov/sites/default/files/document/forms/i-9.pdf';
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

      const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // Show all field names in console
      form.getFields().forEach(f => console.log(f.getName()));

      // Fill a few known fields
      try {
        form.getTextField('topmostSubform[0].Page1[0].f1_1[0]').setText('John');
        form.getTextField('topmostSubform[0].Page1[0].f1_2[0]').setText('Doe');
      } catch (err) {
        console.error("Field name error:", err);
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'filled-i-9.pdf';
      link.click();
    }
  </script>
</body>
</html>