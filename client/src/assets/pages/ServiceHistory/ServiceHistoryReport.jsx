import React, { useState } from "react";

import jspdf from "jspdf";
import "jspdf-autotable";

export default function PackageReport({ filteredServiceHistories }) {





    function generatePDF(filteredServiceHistories) {
        const doc = new jspdf();
        const tableColumn = [
            "No",
            "Cus_ID",
            "Service_ID",
            "Cus_Name",
            "Allo_Employee",
            "Vehicle NO",
            "Milage",
            "Package",
            "Services",
            "Next Service",
            "History",
            "Service Date"
        ];
        const tableRows = [];

        filteredServiceHistories
            .slice(0)
            .reverse()
            .map((service, index) => {
                const data = [
                    index + 1,
                    service.cusID,
                    service.Booking_Id,
                    service.Customer_Name,
                    service.Customer_Email,
                    service.Allocated_Employee,
                    service.Vehicle_Number,
                    service.Milage,
                    service.Package,
                    service.selectedServices,
                    service.nextService,
                    service.Service_History,
                    service.Service_Date
                ];
                tableRows.push(data);
            });

        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];

        doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
        doc.text("Nadeeka Auto care", 60, 15);

        doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
        doc.text("Service Details Report", 65, 25);

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
            columnStyles: {
                0: { cellWidth: 8 },
                1: { cellWidth: 12 },
                2: { cellWidth: 12 },
                3: { cellWidth: 15 },
                4: { cellWidth: 15 },
                5: { cellWidth: 15 },
                6: { cellWidth: 15 },
                7: { cellWidth: 15 },
                8: { cellWidth: 20 },
                9: { cellWidth: 20 },
                10: { cellWidth: 20 },
                11: { cellWidth: 20 },
            },
        });

        doc.save(`Services-Histories-Details-Report_${dateStr}.pdf`);
    }

    return (
        <div>
            <div className="">
                <button
                    onClick={() => {
                        generatePDF(filteredServiceHistories);
                    }}
                    className="ml-3"
                >
                    Service Report
                </button>
            </div>
        </div>
    );
}