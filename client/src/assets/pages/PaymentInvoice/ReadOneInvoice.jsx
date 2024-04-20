import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "../../css/Invoice.css";

const ReadOneInvoice = () => {
  const [paymentInvoice, setPaymentInvoice] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/PaymentInvoice/${id}`)
      .then((res) => {
        setPaymentInvoice(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setPaymentInvoice({});
        setLoading(false);
      });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="page-content container">
      <div className="col-md-10 offset-md-1">
        <div
          ref={componentRef}
          style={{
            margin: "20px", // Set margin to 20px
            border: "1px solid black", // Add border for visibility
            padding: "20px", // Add padding for content spacing
          }}
        >
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
                      <span className="text-default-d3">
                        Nadeeka Auto Service
                      </span>
                    </div>
                  </div>
                </div>
                <hr class="row brc-default-l1 mx-n1 mb-4" />

                <div class="row">
                  <div class="col-sm-6">
                    <div>
                      <span class="text-sm text-grey-m2 align-middle">
                        <strong>To:</strong>
                      </span>
                      <span class="text-600 text-110 text-blue align-middle">
                        {" "}
                        {paymentInvoice.customerName}
                      </span>
                    </div>

                    <div class="text-black-m2">
                      <div class="my-1">
                        <strong>Customer ID:</strong>
                        <span>{paymentInvoice.cusID}</span>
                      </div>
                      <div class="my-1">
                        <strong>Service ID:</strong>
                        <span>{paymentInvoice.Booking_Id}</span>
                      </div>
                      <div class="my-1">
                        <strong>Payment ID:</strong>
                        <span>{paymentInvoice.PaymentId}</span>
                      </div>
                    </div>

                    <div class="text-95">
                      <hr class="d-sm-none" />
                      <div class="text-black-m2">
                        <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125"></div>

                        <div class="my-2">
                          <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                          <span class="text-600 text-90">
                            Vehicle No:{paymentInvoice.Vehicle_Number}
                          </span>{" "}
                        </div>

                        <div class="my-2">
                          <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                          <span class="text-600 text-90">
                            Color:{paymentInvoice.Vehicle_Color}
                          </span>
                        </div>

                        <div class="my-2">
                          <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                          <span class="text-600 text-90">
                            Year:{paymentInvoice.Year}
                          </span>
                        </div>
                        <div class="my-2">
                          <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                          <span class="text-600 text-90">
                            Engine:{paymentInvoice.Engine_Details}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row border-b-2 brc-default-l2">
                    <strong>Package Details</strong>
                  </div>
                  <br></br>
                  <br></br>

                  <div class="table-responsive">
                    <table class="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                      <thead class="bg-none bgc-default-tp1">
                        <tr class="text-white">
                          <th>Package</th>
                          <th width="140">Amount</th>
                        </tr>
                      </thead>

                      <tbody class="text-96 text-black text-secondary-d3">
                        <tr></tr>
                        <tr>
                          <td>
                            <span>{paymentInvoice.Package}</span>
                          </td>
                          <td class="text-secondary-d2">
                            <span>{paymentInvoice.Pamount}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="row border-b-2 brc-default-l2"></div>
                  <br></br>
                  <div class="table-responsive">
                    <br></br>
                    <strong>Service Details</strong>
                    <br></br>
                    <br></br>
                    <table class="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                      <thead class="bg-none bgc-default-tp1">
                        <tr class="text-white">
                          <th>Service</th>
                          <th width="140">Amount</th>
                        </tr>
                      </thead>

                      <tbody class="text-96 text-secondary-d3">
                        <tr></tr>
                        <tr>
                          <td>
                            <span>{paymentInvoice.selcetedServices}</span>
                          </td>
                          <td class="text-secondary-d2">
                            <span>{paymentInvoice.Samount}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="row border-b-2 brc-default-l2"></div>
                  <br></br>

                  <div class="col-12 col-sm-5 text-black text-70 order-first order-sm-last">
                    <div class="row my-2">
                      <br></br>
                      <div class="col-7 text-right">Package Amount</div>
                      <div class="col-5">
                        <span class="text-120 text-secondary-d1">
                          {paymentInvoice.Pamount}
                        </span>
                      </div>
                    </div>

                    <div class="row my-2">
                      <div class="col-7 text-right">Service Amount</div>
                      <div class="col-5">
                        <span class="text-110 text-secondary-d1">
                          {paymentInvoice.Samount}
                        </span>
                      </div>
                    </div>

                    <div class="row my-2">
                    <div class="col-7 text-right">Total Amount</div>
                    <div class="col-5">
                      <span class="text-110 text-secondary-d1">
                        <strong>{paymentInvoice.totalAmount}</strong>
                      </span>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              </div>
              <br></br><br></br><br></br>
              <button className="btn btn-danger btn-sm" onClick={handlePrint}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default ReadOneInvoice;
