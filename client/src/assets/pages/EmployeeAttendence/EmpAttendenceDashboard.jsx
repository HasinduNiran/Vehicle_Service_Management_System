import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
//import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ReportEmployeesAttendence from './ReportEmployeeAttendence';
import logo from '../../images/logo.jpg';
import backgroundImage from '../../images/empbg.jpg';

function ShowEmployeeAttendence() {
    const [employeesAttendence, setEmployeesAttendence] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');

    //const [showType, setShowType] = useState('table');
    const componentRef = useRef();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/EmployeeAttendence')
            .then((response) => {
                const sortedData = response.data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEmployeesAttendence(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        // Filter employeesAttendance based on search criteria
        const filteredAttendence = employeesAttendence.filter((attendance) => {
            // Check if searchName and searchDate are empty or match the attendance record
            return (searchName === '' || attendance.employeeName.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || attendance.date.includes(searchDate));
        });
        return filteredAttendence;
    };

    const filteredEmployeesAttendence = handleSearch();

    // Get unique employee names
    const employeeNames = [...new Set(employeesAttendence.map((attendance) => attendance.employeeName))];

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
            padding: '0.8rem 0.8rem',
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
            width: '95%',
            borderCollapse: 'collapse',
            borderBottom: '1px solid red',
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
                            <select className="form-control"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            >
                                <option value=''>All Employees</option>
                                {employeeNames.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                            <input className="form-control"
                                type='month'
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                            />
                        </div>
                    </form>
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Activity Log</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Logout</a></li>
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
                                            onClick={() => { window.location.href = '/EmployeeAttendence/create' }}
                                            style={styles.navButton}>
                                            Add Employee Attendence
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/employees/EmployeeDashboard' }}
                                            style={styles.navButton}>
                                            All Employees
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/EmployeeAttendence/EmpADashboard' }}
                                            style={styles.navButton}>
                                            Employee Attendence
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/EmployeeSalary/EmpSDashboard' }}
                                            style={styles.navButton}>
                                            Employee Salary
                                        </button>
                                        <div
                                            style={styles.navButton}>
                                            <ReportEmployeesAttendence filteredEmployeesAttendence={filteredEmployeesAttendence} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Logged in as:</div>
                                Employee manager
                            </div>
                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        {loading ? (<Spinner />
                        ) : (
                            <main>
                                <div className="">
                                    <h1 style={styles.subHeading}>Employee Attendence Dashboard</h1>
                                    <div className="">
                                        <div className='' ref={componentRef}>
                                            <table className='' style={styles.table}>
                                                <thead style={styles.tableHead}>
                                                    <tr>
                                                        <th style={styles.tableHeader}>No</th>
                                                        <th style={styles.tableHeader}>EmpID</th>
                                                        <th style={styles.tableHeader}>Employee Name</th>
                                                        <th style={styles.tableHeader}>Date</th>
                                                        <th style={styles.tableHeader}>InTime</th>
                                                        <th style={styles.tableHeader}>OutTime</th>
                                                        <th style={styles.tableHeader}>Worked hours</th>
                                                        <th style={styles.tableHeader}>OT hours</th>
                                                        <th style={styles.tableHeader}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredEmployeesAttendence.map((EmployeeAttendence, index) => (
                                                        <tr key={EmployeeAttendence._id} className='h-8'>
                                                            <td style={styles.tableCell}>
                                                                {index + 1}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                {EmployeeAttendence.EmpID}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                {EmployeeAttendence.employeeName}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                {EmployeeAttendence.date}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                {EmployeeAttendence.InTime}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                {EmployeeAttendence.OutTime}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                {EmployeeAttendence.WorkingHours}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                {EmployeeAttendence.OThours}
                                                            </td>
                                                            <td style={styles.tableCell}>
                                                                <div className='flex justify-center gap-x-4'>
                                                                    {/* <Link to={`/EmployeeAttendence/details/${EmployeeAttendence._id}`}>
                                                                        <BsInfoCircle className='text-2x1 text-green-800' />
                                                                    </Link> */}
                                                                    <Link to={`/EmployeeAttendence/edit/${EmployeeAttendence._id}`}>
                                                                        <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                                                    </Link>
                                                                    <Link to={`/EmployeeAttendence/delete/${EmployeeAttendence._id}`}>
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

export default ShowEmployeeAttendence
