import React from "react";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function ReportEmployee({ filteredEmployeesSalary }) {
  function generatePDF(filteredEmployeesSalary) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Emp ID",
      "Employee Name",
      "From Date",
      "To Date",
      "Total OT Hours",
      "Total OT Pay",
      //"Total Worked Hours",
      "Basic Salary",
      "Total Salary",
    ];
    const tableRows = [];

    filteredEmployeesSalary
      .slice(0)
      .reverse()
      .map((employee, index) => {
        const data = [
          index + 1,
          employee.EmpID,
          employee.employeeName,
          employee.fromDate,
          employee.toDate,
          employee.totalOThours,
          employee.totalOTpay,
          //employee.totalWorkedhours,
          employee.BasicSalary,
          employee.TotalSalary,
        ];
        tableRows.push(data);
      });

    const date = new Date();
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('red');
    doc.text("Nadeeka Auto care", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Employee Salary Report", 65, 25);

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

    doc.save(`Employee-Salary-Report_${dateStr}.pdf`);

    // Compose email details
    const emailSubject = encodeURIComponent('Employee Salary Report');
    const emailBody = encodeURIComponent('Please find attached the employee salary report.');
    const emailRecipient = encodeURIComponent('kavindipathiraja02@gmail.com');
    const emailAttachment = encodeURIComponent(`Employee-Salary-Report_${dateStr}.pdf`);

    // Generate mailto link
    const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}&attachment=${emailAttachment}`;

    // Open Outlook with email details
    window.location.href = mailtoLink;
  }

  return (
    <div>
      <div className="grid md:grid-cols-1 gap-1 ">
        <button
          onClick={() => {
            generatePDF(filteredEmployeesSalary);
          }}
          className="btn2"
        >
           Salary Report
        </button>
      </div>
    </div>
  );
}