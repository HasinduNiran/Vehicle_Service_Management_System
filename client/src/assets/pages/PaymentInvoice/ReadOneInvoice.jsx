import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import "../../css/Invoice.css";
import logo from '../../images/logo.jpg';

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

  const handlePrint = () => {
    window.print();
  };

  const tableHeaderStyle = {
    backgroundColor: 'red', // Set the background color to blue
    color: 'white', // Set text color to white for better visibility
    fontWeight: 'bold', // Make the text bold
    fontSize: '15px', // Set the font size
  };

  return (
    <div style={{ borderTop: '20px solid #FFCCCC' }}>  
    <div style={{ borderBottom: '20px solid #FFCCCC' }}>  
    
    <div ref={componentRef} style={styles.container}>

        <div style={styles.b1}>
        {/* <div className="container my-5 py-5"> */}
          <div className="pattern d-md-flex justify-content-between align-items-center border-top border-bottom mb-5 py-5 py-md-3 ">
            <div className="d-none d-md-flex pattern-overlay pattern-right">
              <img src="images/pattern-blur-right.png" />
            </div>
            <div>
              <img src={logo} alt="Nadeeka Auto Logo" style={styles.logo} />
              
            </div>
            
            <div style={styles.invoice}>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '30px' }}>Nadeeka Auto Care</p>
            <br></br>
            <br></br>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '15px',position:'relative',left:'105px' }}>Invoice No: <span>{paymentInvoice.InvoiceId}</span></div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '15px',position:'relative',left:'105px' }}>Invoice Date: <span>{paymentInvoice.PaymentDate}</span></div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '15px',position:'relative',left:'105px' }}>Invoice To: <span>{paymentInvoice.customerName}</span></div>
            </div>
          </div>
          {/* <hr style={{ border: '2px solid white ', width: '120%' }} /> */}
          <div className="d-md-flex justify-content-between pt-2">
            <div className="mt-5 mt-md-0">
            <div style={styles.add}>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '15px',position:'relative',right:'-40px'  }}>Customer ID: <span>{paymentInvoice.cusID}</span></p>
              <ul style={{ color: 'white', fontWeight: 'bold', fontSize: '15px',position:'relative',right:'-40px'  }}>
                <li>Customer Email: <span>{paymentInvoice.email}</span></li>
                <li>Service ID: <span>{paymentInvoice.Booking_Id}</span></li>
                <li>Payment ID: <span>{paymentInvoice.PaymentId}</span></li>
              </ul>
            </div>
            </div>
            <div className="mt-5 mt-md-0">
            <div style={styles.add}>
              <div style={styles.b1}>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>Vehicle No: <span>{paymentInvoice.Vehicle_Number}</span></p>
              <ul style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>
                <li>Color: <span>{paymentInvoice.Vehicle_Color}</span></li>
                <li>Model: <span>{paymentInvoice.Model}</span></li>
                <li>Year: <span>{paymentInvoice.Year}</span></li>
                <li>Engine: <span>{paymentInvoice.Engine_Details}</span></li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.b3}>
        <table className="table border my-5">
          <thead>
          <tr style={{ backgroundColor: '#FFCCCC' }} className="bg-primary">
              <th style={{ color: 'black', fontWeight: 'bold', fontSize: '15px' ,backgroundColor: '#FFCCCC'}}>Package</th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ backgroundColor: '#FFCCCC' }} ></th>
              <th style={{ color: 'black', fontWeight: 'bold', fontSize: '15px',backgroundColor: '#FFCCCC' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td  style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}><span>{paymentInvoice.Package}</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td  style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}><span>{paymentInvoice.Pamount}</span></td>
            </tr>
          </tbody>
        </table>
        {/* <br /> */}
        <table className="table border my-4">
          <thead>
            <tr style={{ backgroundColor: '#FFCCCC' }} className="bg-primary">
              <th style={{ color: 'black', fontWeight: 'bold', fontSize: '15px',background:'#FFCCCC' }}>Service</th>
              <th  style={{ backgroundColor: '#FFCCCC' }}></th>
              <th  style={{ backgroundColor: '#FFCCCC' }}></th>
              <th  style={{ backgroundColor: '#FFCCCC' }}></th>
              <th  style={{ backgroundColor: '#FFCCCC' }}></th>
              <th  style={{ backgroundColor: '#FFCCCC' }}></th>
              <th  style={{ backgroundColor: '#FFCCCC' }}></th>
              <th  style={{ backgroundColor: '#FFCCCC' }}></th>
              <th  style={{ color: 'black', fontWeight: 'bold', fontSize: '15px',background:'#FFCCCC' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td  style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}><span>{paymentInvoice.selcetedServices}</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td  style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}><span>{paymentInvoice.Samount}</span></td>
            </tr>

          </tbody>
        </table>
        <table className="table border my-5">
          <tbody>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td  style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>Package Amount:</td>
              <td  style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}><span>{paymentInvoice.Pamount}</span></td>
            </tr>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td  style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>Service Amount:</td>
              <td style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}><span>{paymentInvoice.Samount}</span></td>
            </tr>
            
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-primary fs-5 fw-bold">Grand-Total</td>
              <td className="text-primary fs-5 fw-bold"><span>{paymentInvoice.totalAmount}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row pattern my-5">
        <div className="pattern-overlay pattern-left">
          <img src="images/pattern-overlay.png" alt="" />
        </div>

        <div className="col-md-6">
          <div style={styles.b2}>
          <h5 className="fw-bold my-4"></h5>
          <ul className="fw-semibold">
            <li>
            <li>Nadeeka Auto care</li>
                <li>1 ela, Moraketiya Road</li>
                <li>Embilipitiya</li>
              {/* <span className="fw-semibold">Account No: </span> 102 3345 56938 */}
            </li>
            <li style={{position:'relative',left:'1400px'}}>
            <button onClick={handlePrint} style={{color:'white'}}>Print</button>
            </li>
          </ul>
        </div>
        </div>

        {/* <div className="col-md-6">
          <h5 className="fw-bold my-4">Terms & Conditions</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            reiciendis quasi ullam delectus iusto ipsum veritatis
            accusantium quis, praesentium pariatur molestiae ducimus voluptate
            perspiciatis.
          </p>
        </div> */}
      </div><div id="footer-bottom">
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

                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    </div>
    </div>
    </div>
  );
};
const styles = {
  container: {
    color: 'white',
    //backgroundImage: `url(${backgroundImage})`,
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  b1:{
   position: 'relative',
   top: '10px',
   left: '-29px',
   width: '100%',
   height: '100%'
  },
  b2:{
    position: 'relative',
    top: '10px',
    left: '33px',
    width: '100%',
    height: '100%',
    color:'white',
   },
   b3:{
    position: 'relative',
    top: '10px',
    left: '33px',
    width: '100%',
    height: '100%',
    color:'white',
    // backgroundColor: 'red',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center'
   },
  invoice:{
    color:'black',
    position: 'relative',
    top: '10px',
    left: '1060px',
    width: '100%',
    height: '100%'
  },
  add:{
    color:'black',
  },
  col:{
    backgroundColor:'black',
  },
  logo: {
    width: '100%',
    height: '200px',
    border: '2px solid #FFCCCC',
    position:'relative',
    top: '10px',
    left: '40px'
  },
};
export default ReadOneInvoice;
