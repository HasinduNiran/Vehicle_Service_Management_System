import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function PackageReport({filteredFeedback}) {
  const [error, setError] = useState(false);
  const [packages, setPackages] = useState([]);



  function generatePDF(filteredFeedback) {
    const doc = new jspdf();
    const tableColumn = [
      "Customer ID",
      "Name",
      "Email",
      "Phone Number",
      "Employee Name",
      "Star Rating",
      "Date of Service",
      "Message",
    ];
    const tableRows = [];

    filteredFeedback
      .slice(0)
      .reverse()
      .map((feedback, index) => {
        const data = [
          index + 1,
          feedback.cusID,
          feedback.name,
          feedback.email,
          feedback.phone_number,
          feedback.employee,
          feedback.date_of_service,
          feedback.message,
        ];
        tableRows.push(data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];



    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Feedback Details Report", 65, 25);

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

    doc.save(`Feedback-Details-Report_${dateStr}.pdf`);
  }
  return (
    <div>
      <div className="">
        <button
          onClick={() => {
            generatePDF(filteredFeedback);
          }}
          className="ml-3"
        >
         Feedback Report
        </button>
      </div>
    </div>
  );
}