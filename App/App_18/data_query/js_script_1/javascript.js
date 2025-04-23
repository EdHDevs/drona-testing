(async () => {
  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(); // already loaded
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  // Step 1: Load Libraries
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

  // Step 2: Create placeholder if not exists
  let content = document.getElementById('content-to-export');
  if (!content) {
    content = document.createElement('div');
    content.id = 'content-to-export';
    content.style.padding = '20px';
    content.style.background = '#f9f9f9';
    content.style.fontFamily = 'Arial';
    content.innerHTML = `
      <h1>Hello from DronaHQ</h1>
      <p>This is dynamically generated content for the PDF.</p>
      <ul>
        <li>Feature A</li>
        <li>Feature B</li>
      </ul>
    `;
    document.body.appendChild(content);
  }

  // Step 3: Generate PDF
  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas(content, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('dronahq-export.pdf');
})();
