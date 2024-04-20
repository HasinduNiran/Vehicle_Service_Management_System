import React, { useState } from 'react';
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

    const data = [
      paymentInvoice.InvoiceId,
      paymentInvoice.customerName,
      paymentInvoice.cusID,
      paymentInvoice.PaymentId,
      paymentInvoice.Package,
      paymentInvoice.selectedServices,
      paymentInvoice.Vehicle_Number,
      paymentInvoice.Vehicle_Color,
      paymentInvoice.Model,
      paymentInvoice.Year,
      paymentInvoice.Engine_Details,
      paymentInvoice.PaymentDate,
      paymentInvoice.Pamount,
      paymentInvoice.Samount,
      paymentInvoice.totalAmount,
      paymentInvoice.Booking_Id,
    ];
    tableRows.push(data);

    const date = new Date();
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    doc.save(`Invoice_${paymentInvoice.InvoiceId}_${dateStr}.pdf`);
  }

  return (
    <div className="page-content container">
      <div className="page-header text-blue-d2">
        <h1 className="page-title text-secondary-d1">
          Invoice ID
          <small className="page-info">
            <i className="fa fa-angle-double-right text-80"></i>
            <span>{paymentInvoice.InvoiceId}</span>
          </small>
        </h1>
      </div>
      <div className="container px-0">
        <div className="row mt-4">
          <div className="col-12 col-lg-12">
            <div className="row">
              <div className="col-12">
                <div className="text-center text-150">
                  <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                  <span className="text-default-d3">Nadeeka Auto Service</span>
                </div>
              </div>
            </div>

            <hr className="row brc-default-l1 mx-n1 mb-4" />

            <div className="row">
              <div className="col-sm-6">
                <div>
                  <span className="text-sm text-grey-m2 align-middle">
                    <strong>To:</strong>
                  </span>
                  <span className="text-600 text-110 text-blue align-middle">
                    {paymentInvoice.customerName}
                  </span>
                </div>

                <div className="text-black-m2">
                  <div className="my-1">
                    <strong>Customer ID:</strong>
                    <span>{paymentInvoice.cusID}</span>
                  </div>
                  <div className="my-1">
                    <strong>Service ID:</strong>
                    <span>{paymentInvoice.Booking_Id}</span>
                  </div>
                  <div className="my-1">
                    <strong>Payment ID:</strong>
                    <span>{paymentInvoice.PaymentId}</span>
                  </div>
                </div>

                <div className="text-95">
                  <hr className="d-sm-none" />
                  <div className="text-black-m2">
                    <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125"></div>

                    <div className="my-2">
                      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                      <span className="text-600 text-90">
                        Vehicle No:{paymentInvoice.Vehicle_Number}
                      </span>
                    </div>

                    <div className="my-2">
                      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                      <span className="text-600 text-90">
                        Color:{paymentInvoice.Vehicle_Color}
                      </span>
                    </div>

                    <div className="my-2">
                      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                      <span className="text-600 text-90">
                        Year:{paymentInvoice.Year}
                      </span>
                    </div>
                    <div className="my-2">
                      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                      <span className="text-600 text-90">
                        Engine:{paymentInvoice.Engine_Details}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row border-b-2 brc-default-l2">
                <strong>Package Details</strong>
              </div>
              <br />
              <br />

              <div className="table-responsive">
                <table className="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                  <thead className="bg-none bgc-default-tp1">
                    <tr className="text-white">
                      <th>Package</th>
                      <th width="140">Amount</th>
                    </tr>
                  </thead>

                  <tbody className="text-96 text-black text-secondary-d3">
                    <tr>
                      <td>
                        <span>{paymentInvoice.Package}</span>
                      </td>
                      <td className="text-secondary-d2">
                        <span>{paymentInvoice.Pamount}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row border-b-2 brc-default-l2"></div>
              <br />
              <div className="table-responsive">
                <br />
                <strong>Service Details</strong>
                <br />
                <br />
                <table className="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                  <thead className="bg-none bgc-default-tp1">
                    <tr className="text-white">
                      <th>Service</th>
                      <th width="140">Amount</th>
                    </tr>
                  </thead>

                  <tbody className="text-96 text-secondary-d3">
                    <tr>
                      <td>
                        <span>{paymentInvoice.selcetedServices}</span>
                      </td>
                      <td className="text-secondary-d2">
                        <span>{paymentInvoice.Samount}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row border-b-2 brc-default-l2"></div>
              <br />

              <div className="col-12 col-sm-5 text-black text-70 order-first order-sm-last">
                <div className="row my-2">
                  <br />
                  <div className="col-7 text-right">Package Amount</div>
                  <div className="col-5">
                    <span className="text-120 text-secondary-d1">
                      {paymentInvoice.Pamount}
                    </span>
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col-7 text-right">Service Amount</div>
                  <div className="col-5">
                    <span className="text-110 text-secondary-d1">
                      {paymentInvoice.Samount}
                    </span>
                  </div>
                </div>
                <div className="container">
                  <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                    <div className="col-7 text-right">Total Amount</div>
                    <div className="col-5">
                      <button className="btn btn-danger btn-sm">
                        {paymentInvoice.totalAmount}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        style={styles.button}
        onClick={generatePDF}
        className="btn2"
      >
        Generate Report
      </button>
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
