import React from "react";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function ReportInvoice({ paymentInvoice }) {
  const generatePDF = (invoice) => {
    const doc = new jspdf();
    const tableColumn = [
      "Field",
      "Value",
    ];
    const tableRows = [];

    // Add invoice data to table rows
    for (const [key, value] of Object.entries(invoice)) {
      tableRows.push([key, value]);
    }

    const date = new Date().toLocaleDateString();
    const filename = `Invoice_${invoice.InvoiceId}_${date}.pdf`;

    // CSS styles
    const styles = {
      header: {
        fontSize: 28,
        fontStyle: "bold",
        textColor: "red",
      },
      title: {
        fontSize: 20,
        textColor: [0, 0, 0], // RGB
      },
      subtitle: {
        fontSize: 15,
        textColor: [100, 100, 100], // RGB
      },
      text: {
        fontSize: 12,
        textColor: [150, 150, 150], // RGB
      },
      tableHead: {
        fillColor: [31, 41, 55], // RGB
        textColor: [255, 255, 255], // RGB
        fontStyle: "bold",
      },
    };

    doc.setFontSize(styles.header.fontSize)
       .setFont("Mooli", "bold")
       .setTextColor(styles.header.textColor);
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal")
       .setFontSize(styles.title.fontSize)
       .setTextColor(styles.title.textColor);
    doc.text("Invoice Details", 65, 25);

    doc.setFont("times", "normal")
       .setFontSize(styles.subtitle.fontSize)
       .setTextColor(styles.subtitle.textColor);
    doc.text(`Date: ${date}`, 65, 35);

    doc
      .setFont("courier", "normal")
      .setFontSize(styles.text.fontSize)
      .setTextColor(styles.text.textColor);
    doc.text(
      "--------------------------------------------------------------------------------------------------",
      0,
      49
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: styles.text.fontSize },
      headStyles: styles.tableHead,
    });

    doc.save(filename);
  };

  return (
    <div>
      <div className="grid md:grid-cols-1 gap-1">
        <button
          onClick={() => {
            generatePDF(paymentInvoice);
          }}
          className="btn2"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
}
