import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import logo from '../../images/logo.jpg';
import backgroundImage from '../../images/t.jpg';
import SidebarV from '../../components/SidebarV';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import SidebarS from '../../components/SidebarS';
import ServiceHistoryReport from './ServiceHistoryReport';

const ServiceHistoryDashboard = () => {
    const [serviceHistories, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [textSearchQuery, setTextSearchQuery] = useState("");
    const [textSearchQuery2, setTextSearchQuery2] = useState("");
    const [dateSearchQuery, setDateSearchQuery] = useState("");
    const componentRef = useRef();

    useEffect(() => {
        fetchServiceHistories();
    }, []);

    const fetchServiceHistories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8076/ServiceHistory');
            setServiceHistory(response.data.service);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    const handleSearch = async () => {
        setLoading(true);
        try {
            if (textSearchQuery && dateSearchQuery) {
                // Convert dateSearchQuery format
                const formattedDateQuery = dateSearchQuery.substring(0, 10);
                
                // Filter by both text and date
                const searchTextQuery = textSearchQuery.toLowerCase();
                const response = await axios.get(`http://localhost:8076/searchservices?search=${searchTextQuery}&date=${formattedDateQuery}`);
                setServiceHistory(response.data);
            } else if (textSearchQuery) {
                // Filter by text only
                const searchTextQuery = textSearchQuery.toLowerCase();
                const response = await axios.get(`http://localhost:8076/searchservices?search=${searchTextQuery}`);
                setServiceHistory(response.data);
            } else if (dateSearchQuery) {
                // Convert dateSearchQuery format
                const formattedDateQuery = dateSearchQuery.substring(0, 10);
                
                // Filter by date only
                const response = await axios.get(`http://localhost:8076/searchservices?date=${formattedDateQuery}`);
                setServiceHistory(response.data);
            } else {
                // Fetch all service histories if no search criteria are provided
                fetchServiceHistories();
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    
    

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'vehicle List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });
    const applyServiceHistoryFilter = (history) => {
        const textQuery = textSearchQuery.toLowerCase();
        const textQuery2 = textSearchQuery2.toLowerCase();
        const dateQuery = dateSearchQuery;
    
        const textFilter = (
            (history.Customer_Name && history.Customer_Name.toLowerCase().includes(textQuery)) ||
            (history.cusID && history.cusID.toLowerCase().includes(textQuery)) ||
            (history.Allocated_Employee && history.Allocated_Employee.toLowerCase().includes(textQuery)) ||
            (history.Vehicle_Number && history.Vehicle_Number.toLowerCase().includes(textQuery)) ||
            (history.Service_History && history.Service_History.toLowerCase().includes(textQuery)) ||
            (typeof history.Milage === 'string' && history.Milage.toLowerCase().includes(textQuery)) ||
            (history.Package && history.Package.toLowerCase().includes(textQuery)) ||
            (history.Booking_Id && history.Booking_Id.toLowerCase().includes(textQuery)) ||
            (history.Service_Date && history.Service_Date.toLowerCase().includes(textQuery)) ||
            (history.nextService && history.nextService.toLowerCase().includes(textQuery)) ||
            (history.Servicename && history.Servicename.toLowerCase().includes(textQuery)) ||
            (history.Month && history.Month.toLowerCase().includes(textQuery))
        );
    
        let dateFilter = true;
        if (dateQuery) {
            const [queryYear, queryMonth, queryDate] = dateQuery.split('-');
            if (history.Service_Date) { // This is the problematic line
                const [serviceYear, serviceMonth, serviceDate] = history.Service_Date.split('-');
                if (queryYear) {
                    dateFilter = dateFilter && (serviceYear === queryYear);
                }
                if (queryMonth) {
                    dateFilter = dateFilter && (serviceMonth === queryMonth);
                }
                if (queryDate) {
                    dateFilter = dateFilter && (serviceDate === queryDate);
                }
            }
        }
    
        return textFilter && dateFilter;
    };
    
    if (history.Service_Date) {
        const [serviceYear, serviceMonth, serviceDate] = history.Service_Date.split('-');
        // Rest of the code...
    }
    
    const filteredServiceHistories = serviceHistories.filter(history => applyServiceHistoryFilter(history));

    const styles = {
        container: {
            color: 'black',
            border: '3px solid white',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        navButton: {
            backgroundColor: 'red',
            color: 'white',
            padding: '0.8rem 3rem',
            borderRadius: '5px',
            width: '220px',
            textDecoration: 'none',
            height: '50px',
            marginTop: '15px'
        },
        logo: {
            width: '100%',
            height: '200px',
            border: '2px solid red'
        },
        table: {
            width: '300px',
            margin: '0 auto',
            padding: '20px',
            background: 'lightgray',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Arial, sans-serif',
            color: '#fff',
            background: '#1f1f1f'
        },
        tableHead: {
            background: '#333',
            color: 'red',
            textAlign: 'center',
        },
        tableHeader: {
            padding: '10px',
            textAlign: 'left',
            color: 'red',
            border: '1px solid red',
        },
        tableCell: {
            padding: '10px',
            textAlign: 'left',
            borderLeft: '1px solid red',
            borderRight: '1px solid red',
            background: '#1f1f1f',
            color: 'white',
        },
        subHeading: {
            marginTop: '20px',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#fff',
            textAlign: 'center',
            textTransform: 'uppercase',
        },
    };

    return (
        <div style={styles.container}>
            <div className="sb-nav-fixed">
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    <a className="navbar-brand ps-3" href="/">Nadeeka Auto Care</a>
                    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                        <div className="input-group gap-4 ">
                            <div>
                                <input className="form-control " type="text" value={textSearchQuery} placeholder="Search for..." aria-label="Search for..." onChange={(e) => setTextSearchQuery(e.target.value)} aria-describedby="btnNavbarSearch" />
                            </div>
                            {/* <div className='ml-10'>
                                <input className="form-control " type="text" value={dateSearchQuery} placeholder="Search for..." aria-label="2024-03-02" onChange={(e) => setDateSearchQuery(e.target.value)} aria-describedby="btnNavbarSearch" />
                            </div> */}
                            {/* <div className='ml-10'>
                                <input className="form-control " type="text" value={textSearchQuery2} placeholder="Search for..." aria-label="2024-03-02" onChange={(e) => setTextSearchQuery2(e.target.value)} aria-describedby="btnNavbarSearch" />
                            </div> */}
                        </div>
                    </form>
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Activity Log</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav-link">
                                    <div className="sb-nav-link-icon">
                                        <img src={logo} alt="Nadeeka Auto Logo" style={styles.logo} />
                                        <button
                                            onClick={() => { window.location.href = '/vehicle/create' }}
                                            style={styles.navButton}
                                        >
                                            Add Vehicle
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/vehicle/dashboard' }}
                                            style={styles.navButton}
                                        >
                                            All Vehicles
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/servicehistory/create' }}
                                            style={styles.navButton}
                                        >
                                            Add History
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/servicehistory/dashboard' }}
                                            style={styles.navButton}
                                        >
                                            View History
                                        </button>
                                        <div style={styles.navButton}>
                                            {/* Pass appropriate props to ServiceHistoryReport */}
                                            <ServiceHistoryReport filteredServiceHistories={filteredServiceHistories} />
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
                                <h1 style={styles.subHeading}>Service Histories Dashboard</h1>
                                <div className="">
                                    <div className='' ref={componentRef}>
                                        <table className='' style={styles.table}>
                                            <thead style={styles.tableHead}>
                                                <tr>
                                                    <th style={styles.tableHeader}>Customer ID</th>
                                                    <th style={styles.tableHeader}>Customer Name</th>
                                                    <th style={styles.tableHeader}>Customer Email</th>
                                                    <th style={styles.tableHeader}>Allocated Employee</th>
                                                    <th style={styles.tableHeader}>Vehicle Number</th>
                                                    <th style={styles.tableHeader}>Milage</th>
                                                    <th style={styles.tableHeader}>Package</th>
                                                    <th style={styles.tableHeader}>Services</th>
                                                    <th style={styles.tableHeader}>Booking ID</th>
                                                    <th style={styles.tableHeader}>Next Service</th>
                                                    <th style={styles.tableHeader}>Service History</th>
                                                    <th style={styles.tableHeader}>Service Date</th>
                                                    <th style={styles.tableHeader}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredServiceHistories.map((history, index) => (
                                                    <tr key={history._id}>
                                                        <td style={styles.tableCell}>{history.cusID}</td>
                                                        <td style={styles.tableCell}>{history.Customer_Name}</td>
                                                        <td style={styles.tableCell}>{history.Customer_Email}</td>
                                                        <td style={styles.tableCell}>{history.Allocated_Employee}</td>
                                                        <td style={styles.tableCell}>{history.Vehicle_Number}</td>
                                                        <td style={styles.tableCell}>{history.Milage}</td>
                                                        <td style={styles.tableCell}>{history.Package}</td>
                                                        <td style={styles.tableCell}>{history.selectedServices}</td>
                                                        <td style={styles.tableCell}>{history.Booking_Id}</td>
                                                        <td style={styles.tableCell}>{history.nextService}</td>
                                                        <td style={styles.tableCell}>{history.Service_History}</td>
                                                        <td style={styles.tableCell}>{history.Service_Date}</td>
                                                        <td style={styles.tableCell}>
                                                            <div className='flex justify-center gap-x-4'>
                                                                <Link to={`/ServiceHistory/get/${history._id}`} > <BsInfoCircle className='text-2x1 text-green-800' /></Link>

                                                                <Link to={`/ServiceHistory/edit/${history._id}`}><AiOutlineEdit className='text-2x1 text-yellow-600' /></Link>

                                                                <Link to={`/ServiceHistory/delete/${history._id}`}><MdOutlineDelete className='text-2x1 text-red-600' /></Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {filteredServiceHistories.length === 0 && <p className="mt-4">No results found.</p>}
                                    </div>
                                </div>
                            </div>
                        </main>
                        <footer className="py-4 bg-dark mt-auto">
                            <div className="container-fluid px-4">
                                <div className="d-flex align-items-center justify-content-between small text-white">
                                    <div>
                                        &copy; {new Date().getFullYear()} Nadeeka Auto Care
                                    </div>
                                    <div>
                                        <a href="#">Privacy Policy</a> &middot; <a href="#">Terms &amp; Conditions</a>
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

export default ServiceHistoryDashboard;
