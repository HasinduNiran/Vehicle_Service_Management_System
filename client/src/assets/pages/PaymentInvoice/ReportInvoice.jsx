import React from "react";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function ReportInvoice({ paymentInvoice }) {
  function generatePDF() {
    const doc = new jspdf();
    const tableColumn = [
      "InvoiceId",
      "customerName",
      "cusID",
      "PaymentId",
      "Package",
      "selectedServices",
      "Vehicle_Number",
      "Vehicle_Color",
      "Model",
      "Year",
      "Engine_Details",
      "PaymentDate",
      "Pamount",
      "Samount",
      "totalAmount",
      "Booking_Id",
    ];
    const tableRows = [];

    filteredPayments
    .slice(0)
    .reverse()
    .map((payment) => {
      const data = [
     //   index + 1,
        payment.PaymentId,
        payment.cusID,
        payment.Vehicle_Number,
        payment.PaymentDate,
        payment.Booking_Id,
        payment.Package,
        payment.selectedServices,
        payment.Pamount,
        payment.Samount,
        payment.totalAmount,
        payment.PaymentMethod,

      ];
      tableRows.push(data);
    });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];



    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Payment Details Report", 65, 25);

    doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
    doc.text(`Report Generated Date: ${dateStr}`, 65, 35);

    doc
      .setFont("courier", "normal")
      .setFontSize(12)
      .setTextColor(150, 150, 150);
    doc.text("Nadeeka Auto Care, 1 ela, Moraketiya Road, Embilipitiya", 30, 45);

    doc
      .setFont("courier", "normal")
      .setFontSize(12)
      .setTextColor(150, 150, 150);
    doc.text(
      "--------------------------------------------------------------------------------------------------",
      0,
      49
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 9 },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    doc.save(`Payment-Details-Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <div className="grid md:grid-cols-1 gap-1">
        <button
          onClick={() => {
            generatePDF(filteredPayments);
          }}
          className="btn2"
        >
          Payment Report
        </button>
      </div>
    </div>
  );
}