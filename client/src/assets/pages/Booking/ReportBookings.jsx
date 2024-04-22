import React from "react";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function ReportBookings({ filteredBooking }) {
  function generatePDF(filteredBooking) {
    const doc = new jspdf();
    const tableColumn = [
      "Number",
      "BookingID",
      "PackageName",
      "Services",
      "CustomerName",
      "VehicleType",
      "VehicleNumber",
      "ContactNumber",
      "Email",
      "BookingDate",
    ];
    const tableRows = [];

    filteredBooking
    .slice(0)
    .reverse()
    .map((booking, index) => {
      const bookingDate = new Date(booking.Booking_Date).toLocaleDateString();
      const data = [
        index + 1,
        booking.Booking_Id,
        booking.selectedPackage,
        booking.selectedServices,
        booking.Customer_Name,
        booking.Vehicle_Type,
        booking.Vehicle_Number,
        booking.Contact_Number,
        booking.Email,
        bookingDate
      ];
      tableRows.push(data);
    });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];



    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Booking Details Report", 65, 25);

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
      styles: { fontSize: 5 },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    doc.save(`Booking-Details-Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <div className="grid md:grid-cols-1 gap-1">
        <button
          onClick={() => {
            generatePDF(filteredBooking);
          }}
          className="btn2"
        >
          Booking Report
        </button>
      </div>
    </div>
  );
}

