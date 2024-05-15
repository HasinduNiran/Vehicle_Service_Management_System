import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
// import { AiOutlineEdit } from 'react-icons/ai';
// import {BsInfoCircle} from 'react-icons/bs';
// import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';
import ReportPayment from "./ReportPayment";
import logo from "../../images/logo.jpg";
import backgroundImage from "../../images/Pback21.jpg";
//import SidebarV from "../../components/SidebarV";

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const componentRef = useRef();

  //search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8076/payments?search=${searchQuery}`
      );
      setPayments(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching payment:", error);
      setError(
        "An error occurred while fetching the payment for the search query."
      );
      setLoading(false);
    }
  };

  const tableContainerStyle = {
    margin: "5px auto", // Adjust margin as needed
    padding: "20px",
    borderRadius: "10px",
    background: "rgba(0, 0, 0, 0.0)", // Semi-transparent black background for blur effect
    backdropFilter: "blur(50px)", // Apply blur effect
    maxWidth: "99%",
    overflowX: "auto",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8076/payments")
      .then((response) => {
        setPayments(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter function to apply search query filter
  const applySearchFilter = (payment) => {
    const { PaymentId, PaymentDate, Vehicle_Number, PaymentMethod } = payment;
    if (!PaymentId || !PaymentDate || !Vehicle_Number || !PaymentMethod) {
      return false; // If any required property is undefined or null, return false
    }
    return (
      PaymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      PaymentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Vehicle_Number
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      PaymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filter payments based on search query
  const filteredPayments = payments.filter(applySearchFilter);

  

  const openEmailClient = (payment) => {
    const emailSubject = 'Payment Details';
    const emailBody = `Payment Id: ${payment.PaymentId}\nPayment Date: ${payment.PaymentDate}\nPackage:${payment.Package}\nService:${payment.selectedServices}\nPackage Amount:${payment.Pamount}\nService Amount:${payment.Samount}\nTotal Amount: ${payment.totalAmount}\nPayment Method: ${payment.PaymentMethod}\nMessage: "Payment is successfull"`;
    window.location.href = `mailto:${payment.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };
  
  

  const styles = {
    container: {
      color: "black",
      border: "3px solid white",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    
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

    table: {
      width: "100%",
      margin: "0px", // Add margin
      padding: "20px",
      background: "transparent",
      borderRadius: "10px",
      boxShadow:
        "10px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      fontFamily: "Arial, sans-serif",
      color: "white",
      borderCollapse: "collapse",
    },
    tableHead: {
      background: "black",
      color: "white",
      textAlign: "center",
      border: "1px solid white",
      //border: '1px solid red',
    },

    tableRowEven: {
      background: "#2f2f2f",

      // border: '1px solid red',
    },
    tableRowOdd: {
      background: "#1f1f1f",
    },
    tableHeader: {
      padding: "10px",
      textAlign: "center", // Center align content
      color: "red",
      border: "1px solid white",
    },
    tableCell: {
      padding: "10px",
      textAlign: "center", // Center align content
      borderLeft: "1px solid white",
      border: "1px solid white",
      borderRight: "1px solid white",
      borderBottom: "1px solid white",
      background: "transparent",
      color: "white",
    },
    subHeading: {
      marginTop: "50px",
      fontSize: "25px",
      font: "Serif",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#fff",
      textAlign: "center",
      textTransform: "uppercase",
    },
  };

  return (
    <div style={styles.container}>
      <div className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3" href="/">
            Nadeeka Auto Care
          </a>
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={searchQuery}
                placeholder="Search for..."
                aria-label="Search for..."
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-describedby="btnNavbarSearch"
              />
              <button
                className="btn btn-primary"
                id="btnNavbarSearch"
                onClick={handleSearch}
                type="button"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Logout
                  </a>
                </li>
                {/* after logout navigate to home */}
              </ul>
            </li>
          </ul>
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
                      <ReportPayment filteredPayments={filteredPayments} />
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
              <div className="">
                <h1 style={styles.subHeading}>Payment Dashboard</h1>
                <div className="">
                  <div className="" style={tableContainerStyle}>
                    <table className="" style={styles.table}>
                      <thead style={styles.tableHead}>
                        <tr>
                          <th className={styles.tableHeader}>Payment ID</th>
                          <th className={styles.tableHeader}>Customer Id</th>
                          <th className={styles.tableHeader}>Email</th>
                          <th className={styles.tableHeader}>Service ID</th>
                          <th className={styles.tableHeader}>Vehicle NO</th>
                          <th className={styles.tableHeader}>Package</th>
                          <th className={styles.tableHeader}>Service name</th>
                          <th className={styles.tableHeader}>Date</th>
                          <th className={styles.tableHeader}>Package Amount</th>
                          <th className={styles.tableHeader}>Service Amount</th>
                          <th className={styles.tableHeader}>Total Amount</th>
                          <th className={styles.tableHeader}>Payment Method</th>
                          <th className={styles.tableHeader}>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment._id}>
                            <td style={styles.tableCell}>
                              {payment.PaymentId}
                            </td>
                            <td style={styles.tableCell}>{payment.cusID}</td>
                            <td style={styles.tableCell}>{payment.email}</td>
                            <td style={styles.tableCell}>
                              {payment.Booking_Id}
                            </td>
                            <td style={styles.tableCell}>
                              {payment.Vehicle_Number}
                            </td>
                            <td style={styles.tableCell}>{payment.Package}</td>
                            <td style={styles.tableCell}>
                              {payment.selectedServices}
                            </td>
                            <td style={styles.tableCell}>
                              {payment.PaymentDate}
                            </td>
                            <td style={styles.tableCell}>{payment.Pamount}</td>
                            <td style={styles.tableCell}>{payment.Samount}</td>
                            <td style={styles.tableCell}>
                              {payment.totalAmount}
                            </td>
                            <td style={styles.tableCell}>
                              {payment.PaymentMethod}
                            </td>
                            <td style={styles.tableCell}>
                              <Link
                                to={`/payments/detail/${payment._id}`}
                                className="text-green-600 mr-2 hover:text-green-800"
                              >
                                View
                              </Link>
                              
                              <Link
                                to={`/payments/edit/${payment._id}`}
                                className="text-red-600 mr-2 hover:text-red-800"
                              >
                                Edit
                              </Link>
                              <Link
                                to={`/payments/delete/${payment._id}`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Delete
                              </Link>
                              
                               <div className='flex justify-center gap-x-4'>
                  {/* Send Email button */}
                  <button onClick={() => openEmailClient(payment)}>
                    Send Email
                  </button>
                  
</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
export default PaymentDashboard;
