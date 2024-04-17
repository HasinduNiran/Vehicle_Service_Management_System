import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import logo from '../../images/logo.jpg';
import VehicleReport from './VehicleReport';
import backgroundImage from '../../images/t.jpg';


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
      (vehicle.Brand && vehicle.Brand.toLowerCase().includes(query)) ||
      (vehicle.Model && vehicle.Model.toLowerCase().includes(query)) ||
      (vehicle.Manufacture_Year && vehicle.Manufacture_Year.toLowerCase().includes(query)) ||
      (vehicle.Owner && vehicle.Owner.toLowerCase().includes(query))
    );
  };

  // Move the declaration of filteredVehicles here
  const filteredVehicles = vehicles.filter(applySearchFilter);

  return (
    <div>
      <h1>Vehicle Dashboard</h1>
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
                    <img src={logo} alt="Nadeeka Auto Logo" style={{ width: '100%', height: '200px', border: '2px solid red' }} />
                    <button
                      className='bg-red-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded border-none cursor-pointer'
                      onClick={() => { window.location.href = '/vehicle/create' }}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '0.8rem 3rem',
                        borderRadius: '5px',
                        width: '220px',
                        textDecoration: 'none',
                        height: '50px',
                        marginTop: '15px'
                      }}
                    >
                      Add Vehicle
                    </button>
                    <button
                      className='bg-red-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded border-none cursor-pointer'
                      onClick={() => { window.location.href = '/vehicle/dashboard' }}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '0.8rem 3rem',
                        borderRadius: '5px',
                        width: '220px',
                        textDecoration: 'none',
                        height: '50px',
                        marginTop: '15px'
                      }}
                    >
                      All Vehicles
                    </button>
                    <button
                      className='bg-red-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded border-none cursor-pointer'
                      onClick={() => { window.location.href = '/ServiceHistory/create' }}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '0.8rem 3rem',
                        borderRadius: '5px',
                        width: '220px',
                        textDecoration: 'none',
                        height: '50px',
                        marginTop: '15px'
                      }}
                    >
                      Add Service History
                    </button>
                    <button
                      className='bg-red-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded border-none cursor-pointer'
                      onClick={() => { window.location.href = '/ServiceHistory' }}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '0.8rem 3rem',
                        borderRadius: '5px',
                        width: '220px',
                        textDecoration: 'none',
                        height: '50px',
                        marginTop: '15px'
                      }}
                    >
                      View Service History
                    </button>
                    <div
                      className='bg-red-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded border-none cursor-pointer'

                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '0.8rem 3rem',
                        borderRadius: '5px',
                        width: '220px',
                        textDecoration: 'none',
                        height: '50px',
                        marginTop: '15px'
                      }}
                    >
                      <VehicleReport  filteredVehicles= {filteredVehicles}/>
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
              <div className="container-fluid px-4">
                <h1 className="mt-4">Vehicle Dashboard</h1>
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Vehicle Details
                  </div>
                  <div className='table-responsive' ref={componentRef}>
                  <table className='table table-bordered table-hover styled-table' style={{ color: 'black', backgroundColor: 'lightgrey', border: '3px solid black' ,backgroundImage: `url(${backgroundImage})`, // Apply background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',}}>

                      <thead>
                        <tr>
                          <th className='text-xl mr-4'>Register Number</th>
                          <th className='text-xl mr-4'>Brand</th>
                          <th className='text-xl mr-4'>Model</th>
                          <th className='text-xl mr-4'>Year</th>
                          <th className='text-xl mr-4'>Engine details</th>
                          <th className='text-xl mr-4'>Fuel Type</th>
                          <th className='text-xl mr-4'>Transmission</th>
                          <th className='text-xl mr-4'>Color</th>
                          <th className='text-xl mr-4'>Features</th>
                          <th className='text-xl mr-4'>Condition</th>
                          <th className='text-xl mr-4'>Owner</th>
                          <th className='text-xl mr-4'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVehicles.map((vehicle) => (
                          <tr key={vehicle._id}>
                            <td>{vehicle.Register_Number}</td>
                            <td>{vehicle.Make}</td>
                            <td>{vehicle.Model}</td>
                            <td>{vehicle.Year}</td>
                            <td>{vehicle.Engine_Details}</td>
                            <td>{vehicle.Fuel_Type}</td>
                            <td>{vehicle.Transmission_Details}</td>
                            <td>{vehicle.Vehicle_Color}</td>
                            <td>{vehicle.Vehicle_Features}</td>
                            <td>{vehicle.Condition_Assessment}</td>
                            <td>{vehicle.Owner}</td>
                            <td>
                              <Link to={`/vehicle/edit/${vehicle._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                              <Link to={`/vehicle/get/${vehicle.Register_Number}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>View</Link>
                              <Link to={`/vehicle/delete/${vehicle._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default VDashboard;
