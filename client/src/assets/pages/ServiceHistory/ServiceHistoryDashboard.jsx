import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import logo from '../../images/logo.jpg';
import backgroundImage from '../../images/t.jpg';
import SidebarV from '../../components/SidebarV';

const ServiceHistoryDashboard = () => {
    const [serviceHistories, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [textSearchQuery, setTextSearchQuery] = useState("");
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
            const searchTextQuery = textSearchQuery.toLowerCase();
            const response = await axios.get(`http://localhost:8076/searchservices?search=${searchTextQuery}&date=${dateSearchQuery}`);
            setServiceHistory(response.data);
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

    const applyServiceHistoryFilter = (service) => {
        const textQuery = textSearchQuery.toLowerCase();
        const dateQuery = dateSearchQuery;

        const textFilter = (
            (service.Customer_Name && service.Customer_Name.toLowerCase().includes(textQuery)) ||
            (service.Allocated_Employee && service.Allocated_Employee.toLowerCase().includes(textQuery)) ||
            (service.Vehicle_Number && service.Vehicle_Number.toLowerCase().includes(textQuery)) ||
            (service.Service_History && service.Service_History.toLowerCase().includes(textQuery)) ||
            (typeof service.Milage === 'string' && service.Milage.toLowerCase().includes(textQuery)) ||
            (service.Package && service.Package.toLowerCase().includes(textQuery)) ||
            (service.Booking_Id && service.Booking_Id.toLowerCase().includes(textQuery)) ||
            (service.Service_Date && service.Service_Date.toLowerCase().includes(textQuery)) ||
            (service.nextService && service.nextService.toLowerCase().includes(textQuery)) ||
            (service.Servicename && service.Servicename.toLowerCase().includes(textQuery)) ||
            (service.Month && service.Month.toLowerCase().includes(textQuery))
        );

        let dateFilter = true;
        if (dateQuery) {
            const [queryYear, queryMonth, queryDate] = dateQuery.split('-');
            const [serviceYear, serviceMonth, serviceDate] = service.Service_Date.split('-');

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

        return textFilter && dateFilter;
    };

    const filteredServiceHistories = serviceHistories.filter(applyServiceHistoryFilter);

    const styles = {
        container: {
            color: 'black',
            border: '3px solid white',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
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
                        <div className="input-group">
                            <input className="form-control" type="text" value={textSearchQuery} placeholder="Search for..." aria-label="Search for..." onChange={(e) => setTextSearchQuery(e.target.value)} aria-describedby="btnNavbarSearch" />
                            <button className="btn btn-primary " id="btnNavbarSearch" onClick={handleSearch} type="button"><i className="fas fa-search"></i></button>

                            <input className="form-control" type="text" value={dateSearchQuery} placeholder="2024-03-..........." aria-label="Search for..." onChange={(e) => setDateSearchQuery(e.target.value)} aria-describedby="btnNavbarSearch" />
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
                    <SidebarV />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="">
                                <h1 style={styles.subHeading}>Service History Dashboard</h1>
                                <div className="">
                                    <div className='' ref={componentRef}>
                                        <table className='' style={styles.table}>
                                            <thead style={styles.tableHead}>
                                                <tr>
                                                    <th style={styles.tableHeader}>Customer ID</th>
                                                    <th style={styles.tableHeader}>Customer Name</th>
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
                                                {filteredServiceHistories.map((service, index) => (
                                                    <tr key={service._id}>
                                                        <td style={styles.tableCell}>{service.cusID}</td>
                                                        <td style={styles.tableCell}>{service.Customer_Name}</td>
                                                        <td style={styles.tableCell}>{service.Allocated_Employee}</td>
                                                        <td style={styles.tableCell}>{service.Vehicle_Number}</td>
                                                        <td style={styles.tableCell}>{service.Milage}</td>
                                                        <td style={styles.tableCell}>{service.Package}</td>
                                                        <td style={styles.tableCell}>{service.selectedServices}</td>
                                                        <td style={styles.tableCell}>{service.Booking_Id}</td>
                                                        <td style={styles.tableCell}>{service.nextService}</td>
                                                        <td style={styles.tableCell}>{service.Service_History}</td>
                                                        <td style={styles.tableCell}>{service.Service_Date}</td>
                                                        <td style={styles.tableCell}>
                                                            <Link to={`/ServiceHistory/edit/${service._id}`} className='text-green-600 mr-2 hover:text-green-800'>Edit</Link>
                                                            <Link to={`/ServiceHistory/delete/${service._id}`} className='text-red-600 mr-2 hover:text-red-800'>Delete</Link>
                                                            <Link to={`/ServiceHistory/get/${service._id}`} className='text-blue-600 hover:text-blue-800'>Show</Link>
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
                        <footer className="py-4 bg-light mt-auto">
                            <div className="container-fluid px-4">
                                <div className="d-flex align-items-center justify-content-between small">
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
