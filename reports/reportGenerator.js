const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const reportGenerator = (data) => {
  // Promisified to allow time to complete the
  const promise = new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 20, bottom: 20, left: 76, right: 76 },
      });
      // Constructs a new file path based on users name. Will overwrite existing reports.
      const filePath = path.resolve(
        __dirname,
        "tempReports",
        `${data.user.display_name}.pdf`
      );

      // Styles for document.
      const headerFont = path.resolve(__dirname, "fonts", "Kanit.ttf");
      const bodyFont = path.resolve(__dirname, "fonts", "Cabin.ttf");
      const h1 = 50;
      const h2 = 20;
      const h3 = 14;
      const p = 12;

      doc.pipe(fs.createWriteStream(filePath));

      // PDF content starts here.
      doc.font(headerFont);
      doc.fontSize(h1);
      doc.text("PegBoard", { align: "center" });

      doc.font(headerFont);
      doc.fontSize(h2);
      doc.text(data.reportName, { align: "center" });

      doc.moveDown(0.4);

      doc.font(headerFont);
      doc.fontSize(h3);
      doc.text(`Player Details`, { underline: true });

      doc.moveDown(0.5);

      doc.font(bodyFont);
      doc.fontSize(p);
      doc.text(`PegBoard player ID: ${data.user.id}`);
      doc.text(`Display name: ${data.user.display_name}`);

      doc.moveDown();

      doc.font(headerFont);
      doc.fontSize(h3);
      doc.text(`Game Statistics`, { underline: true });

      doc.moveDown(0.5);

      doc.font(bodyFont);
      doc.fontSize(p);
      data.dataPoints.forEach((point) => {
        doc.text(`${point.name}: ${point.value}`);
      });
      // End of content writing.

      doc.end();

      // Timeout allows time for content write to complete to prevent server returning errors to client.
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          resolve(filePath);
        }
        reject(new Error("Operation timed out"));
      }, 1000);
    } catch (err) {
      reject(err.message || "Error in PDF creator");
    }
  });
  return promise;
};

module.exports = reportGenerator;
