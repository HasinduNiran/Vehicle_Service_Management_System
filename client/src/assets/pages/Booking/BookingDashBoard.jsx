import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import ReportBookings from '../Booking/ReportBookings';
import logo from '../../images/logo.jpg';
import backgroundImage from '../../images/t.jpg';

function BookingDashBoard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8076/searchbooking?search=${searchQuery}`);
            setBookings(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/bookings/')
            .then((response) => {

                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

            });

    }, []);


    const applySearchFilter = (booking) => {
        return (
            booking.Customer_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Vehicle_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Booking_Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Booking_Date.includes(searchQuery) ||
            booking.Contact_Number.includes(searchQuery)
        );
    };

    const filteredBooking = bookings.filter(applySearchFilter);

    const styles = {
        container: {
            color: 'black',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        },
        navButton: {
            backgroundColor: 'red',
            color: 'white',
            padding: '0.8rem 2rem',
            borderRadius: '5px',
            width: '220px',
            textDecoration: 'none',
            height: '50px',
            marginTop: '15px',

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
            background: '#1f1f1f',
            width: '100%',
            borderCollapse: 'collapse',
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
        tableRowEven: {
            background: '#2f2f2f',
        },
        tableRowOdd: {
            background: '#1f1f1f',
        },
        tableCell: {
            padding: '10px',
            textAlign: 'left',
            borderLeft: '1px solid red', // Adding left border
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
                        <div className="input-group">
                            <input className="form-control" type="text" value={searchQuery} placeholder="Search for..." aria-label="Search for..." onChange={(e) => setSearchQuery(e.target.value)} aria-describedby="btnNavbarSearch" />
                            <button className="btn btn-primary" id="btnNavbarSearch" onClick={handleSearch} type="button"><i className="fas fa-search"></i></button>
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
                                            onClick={() => { window.location.href = '/booking/bookinglimitdashboard' }}
                                            style={styles.navButton}>
                                            Booking Limit
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/booking/adminbooking' }}
                                            style={styles.navButton}>
                                            Add Booking
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/booking/dashboard' }}
                                            style={styles.navButton}>
                                            All Bookings
                                        </button>
                                        <div
                                            style={styles.navButton}>
                                            <ReportBookings filteredBooking={filteredBooking} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Logged in as:</div>
                                Appointment manager
                            </div>
                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        {loading ? (<Spinner />) : (
                            <main>
                                <div className="">
                                    <h1 style={styles.subHeading}>Booking Dashboard</h1>
                                    <div className="">
                                        <div className='' ref={componentRef}>
                                            <table className='' style={styles.table}>
                                                <thead style={styles.tableHead}>
                                                    <tr>
                                                        <th style={styles.tableHeader}>No</th>
                                                        <th style={styles.tableHeader}>Booking_ID</th>
                                                        <th style={styles.tableHeader}>Package Name</th>
                                                        <th style={styles.tableHeader}>Services</th>
                                                        <th style={styles.tableHeader}>Customer_Name</th>
                                                        <th style={styles.tableHeader}>Vehicle_Type</th>
                                                        <th style={styles.tableHeader}>Vehicle_Number</th>
                                                        <th style={styles.tableHeader}>Contact_Number</th>
                                                        <th style={styles.tableHeader}>Email</th>
                                                        <th style={styles.tableHeader}>Booking_Date</th>
                                                        <th style={styles.tableHeader}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredBooking.map((booking, index) => (
                                                        <tr key={booking._id} className='h-8'>
                                                            <td style={styles.tableCell}>{index + 1}</td>
                                                            <td style={styles.tableCell}>{booking.Booking_Id}</td>
                                                            <td style={styles.tableCell}>{booking.selectedPackage}</td>
                                                            <td style={styles.tableCell}>{booking.selectedServices}</td>
                                                            <td style={styles.tableCell}>{booking.Customer_Name}</td>
                                                            <td style={styles.tableCell}>{booking.Vehicle_Type}</td>
                                                            <td style={styles.tableCell}>{booking.Vehicle_Number}</td>
                                                            <td style={styles.tableCell}>{booking.Contact_Number}</td>
                                                            <td style={styles.tableCell}>{booking.Email}</td>
                                                            <td style={styles.tableCell}>{booking.Booking_Date.slice(0, 10)}</td>
                                                            <td style={styles.tableCell}>
                                                                <div className='flex justify-center gap-x-4'>
                                                                    <Link to={`/booking/read/${booking._id}`}>
                                                                        <BsInfoCircle className='text-2x1 text-green-800' />
                                                                    </Link>
                                                                    <Link to={`/edit/${booking._id}`}>
                                                                        <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                                                    </Link>
                                                                    <Link to={`/booking/delete/${booking._id}`}>
                                                                        <MdOutlineDelete className='text-2x1 text-red-600' />
                                                                    </Link>
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
                        )}
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

export default BookingDashBoard;
