import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function PackageReport({filteredpkg}) {
  const [error, setError] = useState(false);
  const [packages, setPackages] = useState([]);



  function generatePDF(filteredpkg) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Package Name",
      "Discrption",
      "Services",
      "Price",
      "exp. Date"

    ];
    const tableRows = [];

    filteredpkg
      .slice(0)
      .reverse()
      .map((vehicle, index) => {
        const data = [
          index + 1,
          vehicle.pakgname,
          vehicle.pkgdescription,
          vehicle.includes,
          vehicle.Price,
          vehicle.exp,
          
        ];
        tableRows.push(data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];



    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Service Package Report", 65, 25);

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

    doc.save(`Service_Package_Report_${dateStr}.pdf`);
  }
  return (
    <div>
      <div className="">
        <button
          onClick={() => {
            generatePDF(filteredpkg);
          }}
          className="ml-3"
        >
          Package Report
        </button>
      </div>
    </div>
  );
}