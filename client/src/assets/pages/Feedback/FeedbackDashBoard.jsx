import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import backgroundImage from "../../images/t.jpg";
import FeedbackReport from "./FeedbackReport";
import logo from "../../images/logo.jpg";
import debounce from "lodash.debounce";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import SidebarS from "../../components/SidebarS";

const FeedbackDashBoard = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();
    const [originalFeedbacks, setOriginalFeedbacks] = useState([]);
    const [error, setError] = useState(null); // Define error state

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8076/feedback");
            setFeedback(response.data.data);
            setOriginalFeedbacks(response.data.data); // Store original feedbacks
            setLoading(false);
        } catch (error) {
            console.error("Error fetching feedback:", error);
            setError("Error fetching feedback. Please try again."); // Set error state
            setLoading(false);
        }
    };

    const handleSearch = debounce(() => {
        const filteredFeedbacks = originalFeedbacks.filter(feedback =>
            applySearchFilter(feedback, searchQuery)
        );
        setFeedback(filteredFeedbacks);
    }, 300);

    const applySearchFilter = (feedback, query) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            String(feedback.cusID).toLowerCase().includes(lowerCaseQuery) ||
            feedback.name.toLowerCase().includes(lowerCaseQuery) ||
            feedback.email.toLowerCase().includes(lowerCaseQuery) ||
            feedback.phone_number.toLowerCase().includes(lowerCaseQuery) ||
            feedback.employee.toLowerCase().includes(lowerCaseQuery) ||
            feedback.date_of_service.toLowerCase().includes(lowerCaseQuery) ||
            feedback.message.toLowerCase().includes(lowerCaseQuery) ||
            String(feedback.star_rating).toLowerCase().includes(lowerCaseQuery)
        );
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
  
    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Feedback List",
        onAfterPrint: () => alert("Data saved in PDF"),
    });

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
      borderCollapse: "collapse",
    },
    tableHead: {
      background: "#333",
      color: "red",
      textAlign: "center",
      // border: '1px solid red',
    },
    tableHeader: {
      padding: "10px",
      textAlign: "left",
      color: "red",
      border: "1px solid red",
    },
    tableRowEven: {
      background: "#2f2f2f",
    },
    tableRowOdd: {
      background: "#1f1f1f",
    },
    tableCell: {
      padding: "10px",
      textAlign: "left",
      borderLeft: "1px solid red", // Adding left border
      borderRight: "1px solid red",
      background: "#1f1f1f",
      color: "white",
    },
    subHeading: {
      marginTop: "20px",
      fontSize: "2 rem",
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
                onKeyPress={handleKeyPress} // Call handleSearch on Enter key press
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
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Activity Log
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
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
                    {/* <button
                      onClick={() => {
                        window.location.href = "/feedback/create";
                      }}
                      style={styles.navButton}
                    >
                      Add Feedback
                    </button> */}
                    <button
                      onClick={() => {
                        window.location.href = "/feedback/dashboard";
                      }}
                      style={styles.navButton}
                    >
                      All Feedback
                    </button>
                    <div
                      style={styles.navButton}
                    >
                      <FeedbackReport filteredFeedback={feedback} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Operation manager
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="">
                <h1 style={styles.subHeading}>Feedback Dashboard</h1>
                <div className="">
                {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
                  <div className="" ref={componentRef}>
                    <table className="" style={styles.table}>
                      <thead style={styles.tableHead}>
                        <tr>
                          <th style={styles.tableHeader}>Customer ID</th>
                          <th style={styles.tableHeader}>Name</th>
                          <th style={styles.tableHeader}>Email</th>
                          <th style={styles.tableHeader}>Phone Number</th>
                          <th style={styles.tableHeader}>Employee Name</th>
                          <th style={styles.tableHeader}>Star Rating</th>
                          <th style={styles.tableHeader}>Date of Service</th>
                          <th style={styles.tableHeader}>Message</th>
                          <th style={styles.tableHeader}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
              {feedback.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No feedbacks available
                  </td>
                </tr>
              ) : (
                feedback.map((feedback) => (
                  <tr key={feedback._id}>
                    <td style={styles.tableCell}>
                    {feedback.cusID}
                    </td>
                    <td style={styles.tableCell}>
                      {feedback.name}
                    </td>
                    <td style={styles.tableCell}>
                      {feedback.email}
                    </td>
                    <td style={styles.tableCell}>
                      {feedback.phone_number}
                    </td>
                    <td style={styles.tableCell}>
                      {feedback.employee}
                    </td>
                    <td style={styles.tableCell}>
                    {feedback.star_rating !== null
                        ? feedback.star_rating
                        : "N/A"}
                    </td>
                    <td style={styles.tableCell}>
                      {feedback.date_of_service}
                    </td>
                    <td style={styles.tableCell}>
                    {feedback.message}
                    </td>
                    <td style={styles.tableCell}>
                              <div className='flex justify-center gap-x-4'>
                                <Link to={`/feedback/get/${feedback._id}`} > <BsInfoCircle className='text-2x1 text-green-800' /></Link>
                                <Link to={`/feedback/edit/${feedback._id}`}><AiOutlineEdit className='text-2x1 text-yellow-600' /></Link>
                                {/* <Link to={`/feedback/delete/${feedback._id}`} ><MdOutlineDelete className='text-2x1 text-red-600' /></Link> */}
                              </div>
                            </td>
                  </tr>
                ))
              )}
            </tbody>
                    </table>
                  </div>
                  )}
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

export default FeedbackDashBoard;