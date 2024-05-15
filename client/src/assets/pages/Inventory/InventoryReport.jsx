import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function InventoryReport({ filteredInventory }) {
  const [error, setError] = useState(false);
  const [packages, setPackages] = useState([]);

  function generatePDF(filteredInventory) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Name",
      "Location",
      "Quantity",
      "Purchased Price",
      "Sell Price",
      "Supplier Name",
      "Supplier Phone",
      "Supplier Email",
      "Operations",
      
    ];
    const tableRows = [];

    // Adjusted mapping logic to generate rows from first to last
    filteredInventory.forEach((inventoryItem, index) => {
      const data = [
        index + 1,
        inventoryItem.Name,
        inventoryItem.Location,
        inventoryItem.Quantity,
        inventoryItem.PurchasedPrice,
        inventoryItem.SellPrice,
        inventoryItem.SupplierName,
        inventoryItem.SupplierPhone,
        inventoryItem.SupplierPhone,
        inventoryItem.SupplierEmail,
      ];
      tableRows.push(data);
    });

    const date = new Date().toLocaleDateString(); // Using simpler method to get current date

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor("red");
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Inventory Details Report", 65, 25);

    doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
    doc.text(`Report Generated Date: ${date}`, 65, 35);

    doc
      .setFont("courier", "normal")
      .setFontSize(12)
      .setTextColor(150, 150, 150);
    doc.text(
      "Nadeeka Auto Care, 1 ela, Moraketiya Road, Embilipitiya",
      30,
      45
    );

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

    doc.save(`Vehicle-Details-Report_${date}.pdf`);
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-1 ">
        <button
          onClick={() => {
            generatePDF(filteredInventory);
          }}
          className="btn2"  >
           Genarate Report
        </button>
      </div>
    </div>
  );
}
