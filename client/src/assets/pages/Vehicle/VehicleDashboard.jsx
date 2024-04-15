import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef();

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

    axios.get('http://localhost:8076/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'vehicle List',
    onAfterPrint: () => alert('Data saved in PDF'),
  });

  //search filter 
  const applySearchFilter = (vehicle) => {
    return (
      vehicle.Register_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.Make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.Model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.selectedYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.Owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredVehicles = vehicles.filter(applySearchFilter);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3" href="index.html">Nadeeka Auto</a>
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button className="btn btn-primary" id="btnNavbarSearch" type="button" onClick={handleSearch}><i className="fas fa-search"></i></button>
            </div>
          </form>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">Settings</a></li>
                <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#!">Logout</a></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  <a className="nav-link" href="index.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Service Package
                  </a>
                  <div className="sb-sidenav-menu-heading">Interface</div>
                  <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Layouts
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                  </a>
                  <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="layout-static.html">Static Navigation</a>
                      <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                    </nav>
                  </div>
                  <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Pages
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                  </a>
                  <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                      <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                        Authentication
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </a>
                      <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav className="sb-sidenav-menu-nested nav">
                          <a className="nav-link" href="login.html">Login</a>
                          <a className="nav-link" href="register.html">Register</a>
                          <a className="nav-link" href="password.html">Forgot Password</a>
                        </nav>
                      </div>
                      <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                        Error
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </a>
                      <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav className="sb-sidenav-menu-nested nav">
                          <a className="nav-link" href="401.html">401 Page</a>
                          <a className="nav-link" href="404.html">404 Page</a>
                          <a className="nav-link" href="500.html">500 Page</a>
                        </nav>
                      </div>
                    </nav>
                  </div>
                  <div className="sb-sidenav-menu-heading">Addons</div>
                  <a className="nav-link" href="charts.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                    Charts
                  </a>
                  <a className="nav-link" href="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Tables
                  </a>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Admin
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">Primary Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Warning Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">Success Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Danger Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        Area Chart Example
                      </div>
                      <div className="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-chart-bar me-1"></i>
                        Bar Chart Example
                      </div>
                      <div className="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                    </div>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    DataTable Example
                  </div>
                  <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', minHeight: '100vh', width: '80%', alignSelf: 'auto' }}>
                    <div style={{ maxWidth: '800px', width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', alignItems: 'center' }}>Vehicles List</h1>
                        <Link to={'/vehicle/create'} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', textDecoration: 'none' }}>Add Vehicle</Link>

                        <div style={{ marginBottom: '0.5rem' }}></div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Enter vehicle"
                          style={{ marginRight: '0.5rem', border: '1px solid #ccc', padding: '0.5rem' }}
                        />
                        <button
                          onClick={handleSearch}
                          style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                        >
                          Search
                        </button>
                      </div>
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: '#f5f5f5' }} ref={componentRef}>
                          <thead>
                            <tr>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Number</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Make</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Model</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Year</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Engine Details</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Transmission Details</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Color</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Features</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Condition Assessment</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Owner</th>
                              <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredVehicles.map((vehicle) => (
                              <tr key={vehicle._id}>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Register_Number}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Make}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Model}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Year}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Engine_Details}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Transmission_Details}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Vehicle_Color}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Vehicle_Features}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Condition_Assessment}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Owner}</td>
                                <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>
                                  <Link to={`/vehicle/edit/${vehicle._id}`} style={{ backgroundColor: '#007bff', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '5px', textDecoration: 'none', marginRight: '0.5rem' }}>Edit</Link>
                                  <Link to={`/vehicle/delete/${vehicle._id}`} style={{ backgroundColor: '#ff6666', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '5px', textDecoration: 'none', marginRight: '0.5rem' }}>Delete</Link>
                                  <Link to={`/vehicle/get/${vehicle.Register_Number}`} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '5px', textDecoration: 'none' }}>Show</Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                        <button style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={generatePDF}>
                          Generate PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
