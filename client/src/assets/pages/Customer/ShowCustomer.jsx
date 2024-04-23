import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import backgroundImage from '../../images/t.jpg';
import logo from '../../images/logo.jpg';

const ShowCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8076/searchCustomer?search=${searchQuery}`
      );
      setCustomer(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching customer:", error);
      setError("An error occurred while fetching the customer for the search query.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/customer')
      .then((response) => {
        setCustomer(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const applySearchFilter = (customer) => {
    if (!customer) return false;
    const { cusID,firstName, lastName, NIC, phone, email, password } = customer;
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      (cusID && cusID.toLowerCase().includes(searchLowerCase)) ||

      (firstName && firstName.toLowerCase().includes(searchLowerCase)) ||
      (lastName && lastName.toLowerCase().includes(searchLowerCase)) ||
      (NIC && NIC.toLowerCase().includes(searchLowerCase)) ||
      (phone && phone.toLowerCase().includes(searchLowerCase)) ||
      (email && email.toLowerCase().includes(searchLowerCase)) ||
        (password && password.toLowerCase().includes(searchLowerCase))
    );
  };

  const filteredCustomer = customer.filter(applySearchFilter);

  return (
    <div className='p-4' style={styles.container}>
      <nav className="sb-topnav navbar navbar-expand " style={{ height: '120px', background: 'black' }}>
        <div className="d-flex justify-content-start align-items-center me-auto">
          <img src={logo} alt="Nadeeka Auto Service" className="logo" style={{ width: '100px', marginLeft: '5px' }} />
          <a className="navbar-brand ps-3 me-4" href="/">
            <span className="text-red">N</span>adeeka Auto Care
          </a>
        </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/" style={{ color: 'white' }}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cLogin" style={{ color: 'white' }}>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/package" style={{ color: 'white' }}>Package</Link>
          </li>
        </ul>
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

      <div className="container-fluid">
        <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar" style={styles.sidebar}>
  <div className="sidebar-sticky">
     
      
    
    
  </div>
</nav>
          {/* Content */}
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className='p-4'>
            <h2 className='text-2xl my-4' style={styles.heading}>CUSTOMER LIST</h2>
              <div className='flex justify-between items-center'>
                <div className="mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter search query"
                    className="mr-2 border border-gray-400 p-2"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Search
                  </button>
                </div>
                <div className="flex justify-center items-center mt-8">
                  <Link to='/customer/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Customer
                  </Link>
                  <div style={{ marginLeft: '10px' }}></div>
                  <Link to='/customer/ReportCustomer' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Report
                  </Link>
                </div>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <table className='w-full border-separate border-spacing-2' style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHead}>Username</th>
                      <th style={styles.tableHead}>Profile Pic</th>
                      <th style={styles.tableHead}>Customer ID</th>
                      <th style={styles.tableHead}>First Name</th>
                      <th style={styles.tableHead}>Last Name</th>
                      <th style={styles.tableHead}>NIC</th>
                      <th style={styles.tableHead}>Phone</th>
                      <th style={styles.tableHead}>Email</th>
                       <th style={styles.tableHead}>Password</th>
                      <th style={styles.tableHead}>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomer.map((customerItem, index) => (
                      <tr key={customerItem.cusID} className={`h-8 ${index % 2 === 0 ? 'even' : 'odd'}`}>
                        <td style={styles.tableCell}>
                          {customerItem.image && (
                            <img src={customerItem.image} alt="Profile Pic" style={styles.logo} />
                          )}
                        </td>
                        <td style={styles.tableCell}>{customerItem.cusID}</td>
                        <td style={styles.tableCell}>{customerItem.firstName}</td>
                        <td style={styles.tableCell}>{customerItem.lastName}</td>
                        <td style={styles.tableCell}>{customerItem.NIC}</td>
                        <td style={styles.tableCell}>{customerItem.phone}</td>
                        <td style={styles.tableCell}>{customerItem.email}</td>
                         <td style={styles.tableCell}>{customerItem.password}</td>
                        <td style={styles.tableCell}>
                          <div className='flex justify-center gap-x-4'>
                            <Link to={`/customer/get/${customerItem.cusID}`}>
                              <BsInfoCircle className='text-2x1 text-yellow-600' />
                            </Link>
                            <Link to={`/customer/edit/${customerItem.cusID}`}>
                              <AiOutlineEdit className='text-2x1 text-yellow-600' />
                            </Link>
                            <Link to={`/customer/delete/${customerItem.cusID}`}>
                              <MdOutlineDelete className='text-2x1 text-red-600' />
                            </Link>
                            <Link to={`/create/${customerItem.cusID}`}>
                              <button>Booking</button>
                            </Link>
                            <Link to={`/feedback/create/${customerItem.cusID}`}>
                              <button>Feedback</button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: 'black',
    border: '3px solid white',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  logo: {
    width: '100%',
    height: '200px',
    border: '2px solid red',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    background: '#333',
    color: 'red',
    textAlign: 'center',
    border: '1px solid red',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'center',
    borderLeft: '1px solid red',
    borderRight: '1px solid red',
    background: '#1f1f1f',
    color: 'white',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',

    
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff', // Change color to white
    textAlign: 'center',
    textTransform: 'uppercase',
   },
  
  
};

export default ShowCustomer;
