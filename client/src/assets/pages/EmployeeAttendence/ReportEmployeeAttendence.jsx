import React from "react";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function ReportfilteredEmployeesAttendence({ filteredEmployeesAttendence }) {
  function generatePDF(filteredEmployeesAttendence) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Emp ID",
      "Employee Name",
      "Date",
      "In Time",
      "Out Time",
      "Working Hours",
      "OT Hours",
    ];
    const tableRows = [];

    filteredEmployeesAttendence
      .slice(0)
      .reverse()
      .map((attendance, index) => {
        const data = [
          index + 1,
          attendance.EmpID,
          attendance.employeeName,
          attendance.date,
          attendance.InTime,
          attendance.OutTime,
          attendance.WorkingHours,
          attendance.OThours,
        ];
        tableRows.push(data);
      });

    const date = new Date();
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Employee Attendance Report", 55, 25);

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

    doc.save(`Employee-Attendance-Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <div style={styles.button}>
        <button
          onClick={() => {
            generatePDF(filteredEmployeesAttendence);
          }}
          className="btn2"
        >
          Generate report
        </button>
      </div>
    </div>
  );
}

const styles = {
  button: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
