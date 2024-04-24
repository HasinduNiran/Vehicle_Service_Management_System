import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import logo from '../../images/logo.jpg';
import VehicleReport from './VehicleReport'; // Adjust the path accordingly

import backgroundImage from '../../images/t.jpg';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import SidebarV from '../../components/SidebarV';

const VDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef();

  // Search query
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8076/searchvehicle?search=${searchQuery}`);
      setVehicles(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching vehicle:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/vehicles`)
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  // Report generating
  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'vehicle List',
    onAfterPrint: () => alert('Data saved in PDF'),
  });

  // Search filter
  const applySearchFilter = (vehicle) => {
    const query = searchQuery ? searchQuery.toLowerCase() : "";
    return (
      (vehicle.Register_Number && vehicle.Register_Number.toLowerCase().includes(query)) ||
      (vehicle.Make && vehicle.Make.toLowerCase().includes(query)) ||
      (vehicle.Model && vehicle.Model.toLowerCase().includes(query)) ||
      (vehicle.Year && vehicle.Year.toLowerCase().includes(query)) ||
      (vehicle.Engine_Details && vehicle.Engine_Details.toLowerCase().includes(query)) ||
      (vehicle.Owner && vehicle.Owner.toLowerCase().includes(query))
    );
  };

  // Move the declaration of filteredVehicles here
  const filteredVehicles = vehicles.filter(applySearchFilter);

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
      padding: '0.5rem 2rem',
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
    }, table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHead: {
      background: '#333',
      color: 'red',
      textAlign: 'center',
      // border: '1px solid red',


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
      fontSize: '2 rem',
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
                      onClick={() => { window.location.href = '/ServiceHistory/create' }}
                      style={styles.navButton}
                    >
                      Add History
                    </button>
                    <button
                      onClick={() => { window.location.href = '/ServiceHistory/dashboard' }}
                      style={styles.navButton}
                    >
                      View History
                    </button>
                    <div
                      style={styles.navButton}
                    >
                      <VehicleReport filteredVehicles={filteredVehicles} />
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
                <h1 style={styles.subHeading}>Vehicle Dashboard</h1>
                <div className="">
                  {/* <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Vehicle Details
                  </div> */}
                  <div className='' ref={componentRef}>
                    <table className='' style={styles.table}>
                      <thead style={styles.tableHead}>
                        <tr>
                          <th style={styles.tableHeader}>Vehicle </th>
                          <th style={styles.tableHeader}>Register Number</th>
                          
                          <th style={styles.tableHeader}>Brand</th>
                          <th style={styles.tableHeader}>username</th>
                          <th style={styles.tableHeader}>Model</th>
                          <th style={styles.tableHeader}>Year</th>
                          <th style={styles.tableHeader}>Engine details</th>
                          {/* <th style={styles.tableHeader}>Fuel Type</th> */}
                          <th style={styles.tableHeader}>Transmission</th>
                          <th style={styles.tableHeader}>Color</th>
                          <th style={styles.tableHeader}>Features</th>
                          <th style={styles.tableHeader}>Condition</th>
                          <th style={styles.tableHeader}>Owner</th>
                          <th style={styles.tableHeader}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVehicles.map((vehicle) => (
                          <tr key={vehicle._id}>
                            <td style={{ ...styles.tableCell, overflow: 'hidden' }}>
                              <img src={vehicle.image} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
                            </td>

                            <td style={styles.tableCell}>{vehicle.Register_Number}</td>
                            <td style={styles.tableCell}>{vehicle.Make}</td>
                            <td style={styles.tableCell}>{vehicle.cusID}</td>
                            <td style={styles.tableCell}>{vehicle.Model}</td>
                            <td style={styles.tableCell}>{vehicle.Year}</td>
                            <td style={styles.tableCell}>{vehicle.Engine_Details}</td>
                            {/* <td style={styles.tableCell}>{vehicle.Fuel_Type}</td> */}
                            <td style={styles.tableCell}>{vehicle.Transmission_Details}</td>
                            <td style={styles.tableCell}>{vehicle.Vehicle_Color}</td>
                            <td style={styles.tableCell}>{vehicle.Vehicle_Features}</td>
                            <td style={styles.tableCell}>{vehicle.Condition_Assessment}</td>
                            <td style={styles.tableCell}>{vehicle.Owner}</td>
                            <td style={styles.tableCell}>
                              <div className='flex justify-center gap-x-4'>
                                <Link to={`/vehicle/get/${vehicle.Register_Number}`} > <BsInfoCircle className='text-2x1 text-green-800' /></Link>
                                <Link to={`/vehicle/edit/${vehicle._id}`}><AiOutlineEdit className='text-2x1 text-yellow-600' /></Link>
                                <Link to={`/vehicle/delete/${vehicle._id}`} ><MdOutlineDelete className='text-2x1 text-red-600' /></Link>
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

export default VDashboard;
