import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ServiceReport from './ServiceReport';
import logo from '../../images/logo.jpg';
import backgroundImage from '../../images/t.jpg';
import Swal from "sweetalert2";

function ServiceDashboard() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8076/searchService?search=${searchQuery}`
            );
            setServices(response.data.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error("Error fetching service:", error);
            setError(
                "An error occurred while fetching the service for the search query."
            );
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/Service')
            .then((response) => {
                setServices(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);
    const handleDeletePackage = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8076/Service/${id}`)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your service has been deleted.",
                                icon: "success"
                            }).then(() => {
                                // Refresh the package list after successful deletion
                                window.location.reload();
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete service.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting service:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete service.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    // Search filter 
    const applySearchFilter = (service) => {
        const Servicename = service.Servicename ? service.Servicename.toLowerCase() : '';
        return (
            Servicename.includes(searchQuery.toLowerCase())
        );
    };

    const filteredService = services.filter(applySearchFilter);

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
                                            onClick={() => { window.location.href = '/package/create' }}
                                            style={styles.navButton}>
                                            Add Package
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/package/dashboard' }}
                                            style={styles.navButton}>
                                            View Packages
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/service/create' }}
                                            style={styles.navButton}>
                                            Add Service
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/service/dashboard' }}
                                            style={styles.navButton}>
                                            View Services
                                        </button>
                                        <div
                                            style={styles.navButton}>
                                            <ServiceReport filteredService={filteredService} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Logged in as:</div>
                                Service Package Admin
                            </div>
                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        {loading ? (<Spinner />) : (
                            <main>
                                <div className="">
                                    <h1 style={styles.subHeading}>Service Dashboard</h1>
                                    <div className="">
                                        <div className='' ref={componentRef}>
                                            <table className='' style={styles.table}>
                                                <thead style={styles.tableHead}>
                                                    <tr>
                                                        <th style={styles.tableHeader}>Service No</th>
                                                        <th style={styles.tableHeader}>Service Name</th>
                                                        <th style={styles.tableHeader}>Price</th>
                                                        <th style={styles.tableHeader}>Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredService.map((service, index) => (
                                                        <tr key={service._id} className='h-8'>
                                                            <td style={styles.tableCell}>{index + 1}</td>
                                                            <td style={styles.tableCell}>{service.Servicename}</td>
                                                            <td style={styles.tableCell}>{service.Price}</td>
                                                            <td style={styles.tableCell}>
                                                                <div className='flex justify-center gap-x-4'>
                                                                 
                                                                    <Link to={`/Service/edit/${service._id}`}>
                                                                        <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                                                    </Link>
                                                                    <button onClick={() => handleDeletePackage(service._id)}>
                                                                        <MdOutlineDelete className='text-2x1 text-red-600' />
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

export default ServiceDashboard;
