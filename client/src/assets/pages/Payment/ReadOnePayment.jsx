import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import backgroundImage from '../../images/Pback21.jpg';
import logo from "../../images/logo.jpg";

const ReadOnePayment=()=> {
  const[payment,setPayment] = useState({});
  const[loading,setLoading] = useState(false);
  const{id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:8076/payments/${id}`)
    .then(res=>{
      setPayment(res.data);
      setLoading(false);
    })
    .catch((error)=>{
      setPayment(res.data);
      setLoading(false);
  });
},[])

return (
  <div style={styles.container}>
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="/">
          Nadeeka Auto Care
        </a>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav-link">
                <div className="sb-nav-link-icon">
                  <img
                    src={logo}
                    alt="Nadeeka Auto Logo"
                    style={styles.logo}
                  />
                  <button
                    onClick={() => {
                      window.location.href = "/payments/pdashboard";
                    }}
                    style={styles.navButton}
                  >
                    All Payments
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "/payments/create";
                    }}
                    style={styles.navButton}
                  >
                    Add Payment
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "/PaymentInvoice/show";
                    }}
                    style={styles.navButton}
                  >
                    View Invoices
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "/PaymentInvoice/create";
                    }}
                    style={styles.navButton}
                  >
                    Add Invoice
                  </button>
                  <div style={styles.navButton}>
                    {/* <PaymentReport filteredPayments={filteredPaymentsf} /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Payment Manager
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            
            <h1 style={styles.heading}> {/* Pass the destination URL here */}Payment Details</h1>
  {loading ? (
    <Spinner />
  ) : (
    <div style={styles.card}>
        <div style={styles.cardBody}>
          <p style={styles.item}>
          <span style={styles.label}>Payment ID:</span><span style={styles.text} > {payment.PaymentId}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Customer ID:</span><span style={styles.text} > {payment.cusID}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Service ID:</span><span style={styles.text} > {payment.Booking_Id}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Vehicle NO:</span><span style={styles.text} > {payment.Vehicle_Number}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Package:</span><span style={styles.text} > {payment.Package}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Service Name:</span><span style={styles.text} > {payment.selectedServices}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Date:</span><span style={styles.text} > {payment.PaymentDate}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Package Amount:</span><span style={styles.text} > {payment.Pamount}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Service Amount:</span><span style={styles.text} > {payment.Samount}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Total Amount:</span><span style={styles.text} > {payment.totalAmount}</span>
          </p>
          <p style={styles.item}>
            <span style={styles.label}>Payment Method:</span><span style={styles.text} > {payment.PaymentMethod}</span>
          </p>
         
     </div>
    </div>
  )}
 </main>
 <footer className="py-4 bg-dark mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small text-white">
                  <div>&copy; {new Date().getFullYear()} Nadeeka Auto Care</div>
                  <div>
                    <a href="#">Privacy Policy</a> &middot;{" "}
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
);
};

// const styles = {
// container: {
//   color: "black",
//   border: "3px solid white",
//   backgroundImage: `url(${backgroundImage})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// },
// navButton: {
//   backgroundColor: "red",
//   color: "white",
//   padding: "0.5rem 2rem",
//   borderRadius: "5px",
//   width: "220px",
//   textDecoration: "none",
//   height: "50px",
//   marginTop: "15px",
// },
// logo: {
//   width: "100%",
//   height: "200px",
//   border: "2px solid red",
// },

// table: {
//   width: "100%",
//   margin: "0px", // Add margin
//   padding: "20px",
//   background: "transparent",
//   borderRadius: "10px",
//   boxShadow:
//     "10px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
//   fontFamily: "Arial, sans-serif",
//   color: "white",
//   borderCollapse: "collapse",
// },
// tableHead: {
//   background: "black",
//   color: "white",
//   textAlign: "center",
//   border: "1px solid white",
//   //border: '1px solid red',
// },

// tableRowEven: {
//   background: "#2f2f2f",

//   // border: '1px solid red',
// },
// tableRowOdd: {
//   background: "#1f1f1f",
// },
// tableHeader: {
//   padding: "10px",
//   textAlign: "center", // Center align content
//   color: "red",
//   border: "1px solid white",
// },
// tableCell: {
//   padding: "10px",
//   textAlign: "center", // Center align content
//   borderLeft: "1px solid white",
//   border: "1px solid white",
//   borderRight: "1px solid white",
//   borderBottom: "1px solid white",
//   background: "transparent",
//   color: "white",
// },
// subHeading: {
//   marginTop: "50px",
//   fontSize: "25px",
//   font: "Serif",
//   fontWeight: "bold",
//   marginBottom: "20px",
//   color: "#fff",
//   textAlign: "center",
//   textTransform: "uppercase",
// },
// };

const styles = {
  container: {
      color: "black",
      border: "3px solid white",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundwidth: "50%",
    },
  // container: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   minHeight: '100vh',
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   //background,repeat: no-repeat,
  //   /* Optionally, you can set a fixed height to ensure the image covers the entire screen */
  //   height: '100%',
  //   /* Optionally, you can also set a fixed width */
  //   width: '100%',
  //   /* Optionally, you can ensure the content does not overflow the viewport */
  //   //overflow: hidden,
  //   color: "black",
  //      border: "3px solid white",
  //   //   backgroundImage: `url(${backgroundImage})`,
  //   //   backgroundSize: "cover",
  //   //   backgroundPosition: "center",
  //},
  // container1: {
  //   display: 'flex',
  //   position:'relative',
  //   top:'10px',
  //   marginBottom:'100px',
    
  // },
  navButton: {
    backgroundColor: "red",
    color: "white",
    padding: "0.5rem 2rem",
    borderRadius: "5px",
    width: "220px",
    textDecoration: "none",
    height: "50px",
    marginTop: "15px",
  },
  logo: {
    width: "100%",
    height: "200px",
    border: "2px solid red",
  },
  // navButton: {
//   backgroundColor: "red",
//   color: "white",
//   padding: "0.5rem 2rem",
//   borderRadius: "5px",
//   width: "220px",
//   textDecoration: "none",
//   height: "50px",
//   marginTop: "15px",
// },
// logo: {
//   width: "100%",
//   height: "200px",
//   border: "2px solid red",
// },

// table: {
//   width: "100%",
//   margin: "0px", // Add margin
//   padding: "20px",
//   background: "transparent",
//   borderRadius: "10px",
//   boxShadow:
//     "10px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
//   fontFamily: "Arial, sans-serif",
//   color: "white",
//   borderCollapse: "collapse",
// },
// tableHead: {
//   background: "black",
//   color: "white",
//   textAlign: "center",
//   border: "1px solid white",
//   //border: '1px solid red',
// },

// tableRowEven: {
//   background: "#2f2f2f",

//   // border: '1px solid red',
// },
// tableRowOdd: {
//   background: "#1f1f1f",
// },
// tableHeader: {
//   padding: "10px",
//   textAlign: "center", // Center align content
//   color: "red",
//   border: "1px solid white",
// },
// tableCell: {
//   padding: "10px",
//   textAlign: "center", // Center align content
//   borderLeft: "1px solid white",
//   border: "1px solid white",
//   borderRight: "1px solid white",
//   borderBottom: "1px solid white",
//   background: "transparent",
//   color: "white",
// },
// subHeading: {
//   marginTop: "50px",
//   fontSize: "25px",
//   font: "Serif",
//   fontWeight: "bold",
//   marginBottom: "20px",
//   color: "#fff",
//   textAlign: "center",
//   textTransform: "uppercase",
// },
  heading: {
    fontSize: '3rem',
    color: 'Red',
    textAlign: 'center',
    fontWeight: 'bold',

    marginBottom: '1.5rem',
  },
  card: {
    width: '60%',
    position: 'relative',
    top: '1px',
    left:'230px',
    margin: '0 auto',
    padding: '20px',
    //backgroundImage: `url(${backgroundImage})`,
   // backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    padding: '20px',
    bordercolor: 'red',
    margin: '10px',
    textAlign: 'center',
  },
  cardBody: {
    padding: '2rem',
  },
  item: {
    marginBottom: '1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#fff',
    display: 'flex',
    
    alignItems: 'center',
    justifyContent:'center',
  },
  text: {
    marginRight: '0.5rem',
    color: '#fff',
    fontSize: '1.5rem',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
  label: {
    
    fontWeight: 'bold',
    color: 'red',
    fontSize: '1.5rem',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },

};

export default ReadOnePayment