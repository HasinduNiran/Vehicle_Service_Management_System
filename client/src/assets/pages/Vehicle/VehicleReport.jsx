import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function PackageReport({filteredVehicles}) {
  const [error, setError] = useState(false);
  const [packages, setPackages] = useState([]);



  function generatePDF(filteredVehicles) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Vehicle NO",
      "Make",
      "Model",
      "Year",
      "Engine_Details",
      "Transmission..",
      "Color",
      "Features",
      "Conditio",
      "Owner",

    ];
    const tableRows = [];

    filteredVehicles
      .slice(0)
      .reverse()
      .map((vehicle, index) => {
        const data = [
          index + 1,
          vehicle.Register_Number,
          vehicle.Make,
          vehicle.Model,
          vehicle.Year,
          vehicle.Engine_Details,
          vehicle.Transmission_Details,
          vehicle.Vehicle_Color,
          vehicle.Vehicle_Features,
          vehicle.Condition_Assessment,
          vehicle.Owner,
        
          
        
        ];
        tableRows.push(data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];



    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Vehicle Details Report", 65, 25);

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

    doc.save(`Vehicle-Details-Report_${dateStr}.pdf`);
  }
  return (
    <div>
      <div className="">
        <button
          onClick={() => {
            generatePDF(filteredVehicles);
          }}
          className="ml-3"
        >
         Vehicle Report
        </button>
      </div>
    </div>
  );
}