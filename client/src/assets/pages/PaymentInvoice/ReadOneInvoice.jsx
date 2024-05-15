import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from '../../images/logo.jpg';
import ReactToPrint from 'react-to-print';

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
  }, [id]);

  const openEmailClient = () => {
    const emailSubject = 'Payment Details';
    const emailBody = `Payment Id: ${paymentInvoice.PaymentId}\nPayment Date: ${paymentInvoice.PaymentDate}\nTotal Amount: ${paymentInvoice.totalAmount}\nPayment Method: ${paymentInvoice.PaymentMethod}\nMessage: "Payment is successful"`;
    window.location.href = `mailto:${paymentInvoice.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div>
      <div style={styles.container} ref={componentRef}>
        <div className="container">
          <div className="container">
            <div className="pattern d-md-flex justify-content-between align-items-center border-top border-bottom py-5 py-md-3">
              <div>
                <img src={logo} alt="Nadeeka Auto Logo" style={styles.logo} />
              </div>
              <div style={styles.invoiceContainer}>
                <div style={styles.invoiceTitle}>INVOICE</div>
                <br></br>
                <div style={{ fontWeight: "bold" }}>
                  <div>Invoice No: <span>{paymentInvoice.PaymentId}</span></div>
                  <div>Invoice Date: <span>{paymentInvoice.PaymentDate}</span></div>
                </div>
              </div>
            </div>

            <div className="d-md-flex justify-content-between pt-2">
              <div style={styles.address}>
                Invoice To: <span>{paymentInvoice.customerName}</span>
                <ul className="list-unstyled">
                  <li>Nadeeka Auto care</li>
                  <li>1 ela, Moraketiya Road</li>
                  <li>Embilipitiya</li>
                </ul>
              </div>
              <div className="mt-5 mt-md-0">
                <div style={styles.address}>
                 Customer ID: <span>{paymentInvoice.cusID}</span>
                  <ul className="list-unstyled">
                    <li>Service ID: <span>{paymentInvoice.Booking_Id}</span></li>
                    <li>Payment ID: <span>{paymentInvoice.PaymentId}</span></li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 mt-md-0">
                <div style={styles.address}>
                  Vehicle No: <span>{paymentInvoice.Vehicle_Number}</span>
                  <ul className="list-unstyled">
                    <li>Color: <span>{paymentInvoice.Vehicle_Color}</span></li>
                    <li>Model: <span>{paymentInvoice.Model}</span></li>
                    <li>Year: <span>{paymentInvoice.Year}</span></li>
                    <li>Engine: <span>{paymentInvoice.Engine_Details}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{color:"white"}}>
              <table className="table border my-5">
                <thead>
                <tr className="bg" style={{ backgroundColor: '#6F8FAF' }}>
                    <th scope="col"style={{ color: 'black' ,fontWeight:'bold'}} >Package</th>
                    <th></th>
                    <th scope="col"style={{ color: 'black' ,fontWeight:'bold'}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}><span>{paymentInvoice.Package}</span></td>
                     <td></td>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}><span>{paymentInvoice.Pamount}</span></td>
                  </tr>
                </tbody>
              </table>
              <table className="table border my-5">
                <thead>
                <tr className="bg" style={{ backgroundColor: '#6F8FAF' }}>
                    <th scope="col"style={{ color: 'black' ,fontWeight:'bold'}}>Service</th>
                    <th></th> <th></th> <th></th>   <th></th> <th></th> <th></th><th></th><th></th><th></th><th></th><th></th>
                    <th scope="col"style={{ color: 'black' ,fontWeight:'bold'}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}><span>{paymentInvoice.selectedServices}</span></td>
                    <td></td><td></td><td></td><td>   </td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}><span>{paymentInvoice.Samount}</span></td>
                  </tr>
                </tbody>
              </table>
              <table className="table border my-5">
                <tbody>
                  <tr>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}>Package Amount:</td>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}><span>{paymentInvoice.Pamount}</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}>Service Amount:</td>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}><span>{paymentInvoice.Samount}</span></td>
                  </tr>
                  <tr>
                    <td style={{ color: 'black' ,fontWeight:'bold'}}>Grand-Total</td>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td style={{ color: 'Black' ,fontWeight:'bold'}}><span>{paymentInvoice.totalAmount}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row pattern my-5">
              <div className="pattern-overlay pattern-left">
                <img src="images/pattern-overlay.png" alt="" />
              </div>

              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li>
                    <span style={{ color: 'white' ,fontWeight:'bold'}}> Thank you. Come Again!</span> 
                  </li>
                </ul>
              </div>
             
            </div>
          </div>
          <div id="footer-bottom">
            <div className="container border-top">
              <div className="row mt-3">
                <div className="col-md-6 copyright">
                  <p></p>
                </div>
                <div className="col-md-6 text-md-end">
                  <p>
                    <a
                      href="https://templatesjungle.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-white-50"
                    >
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
         </div>
      </div>
      
      <div style={{ position: 'absolute', top: 100, right: 10 }}>
        <button
          onClick={openEmailClient}
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid black',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            position:"relative",
            top:'835px',
            fontSize: '14px', // Adjust the font size here
          }}
        >
          Send Email
        </button>
      </div>
      <ReactToPrint
        trigger={() => <button style={{ position: 'absolute', top: '935px', left: 10 ,color:'white'}}>Download PDF</button>}
        content={() => componentRef.current}
      />
    </div>
  );
};

const styles = {
  container: {
    color: 'black',
    backgroundColor: '#154360  ',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingBottom: '60px',
  },
  invoiceContainer: {
    color: 'white',
  },
  invoiceTitle: {
    fontSize: '30px',
  },
  address: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: '100%',
    height: '200px',
    border: '2px solid black'
  },
};

export default ReadOneInvoice;
