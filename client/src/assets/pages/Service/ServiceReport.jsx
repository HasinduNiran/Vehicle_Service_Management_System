import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function ServiceReport({ filteredService }) {

  function generatePDF(filteredService) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Service Name",
      "Price" // Added Price column
    ];
    const tableRows = [];

    filteredService
      .slice(0)
      .reverse()
      .map((Service, index) => {
        const data = [
          index + 1,
          Service.Servicename,
          Service.Price // Added Price data
        ];
        tableRows.push(data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Services Report", 65, 25);

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

    doc.save(`Services_Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <div className="">
        <button
          onClick={() => {
            generatePDF(filteredService);
          }}
          className="ml-3"
        >
          Services Report
        </button>
      </div>
    </div>
  );
}
