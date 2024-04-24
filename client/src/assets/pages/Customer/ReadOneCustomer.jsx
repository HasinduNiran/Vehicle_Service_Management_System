
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import logo from '../../images/logo.jpg';
import backgroundImage from '../../images/t.jpg';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";

const ReadOneCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [serviceHistories, setServiceHistory] = useState([]);
  const [feedback, setFeedback] = useState({});
  

  const { id: cusID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const customerResponse = await axios.get(`http://localhost:8076/customer/${cusID}`);
        setCustomer(customerResponse.data);

        const bookingsResponse = await axios.get(`http://localhost:8076/bookings/${cusID}`);
        setBookings(bookingsResponse.data);

        const paymentResponse = await axios.get(`http://localhost:8076/payments/${cusID}`);
        setPayments(paymentResponse.data);

        const vehicleResponse = await axios.get(`http://localhost:8076/vehicles/${cusID}`);
        setVehicles(vehicleResponse.data);

        const ServiceHistoryResponse = await axios.get(`http://localhost:8076/ServiceHistory/${cusID}`);
        setServiceHistory(ServiceHistoryResponse.data);

        const FeedbackResponse = await axios.get(`http://localhost:8076/feedback/${cusID}`);
        setFeedback(FeedbackResponse.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cusID]);

  const styles = {
    container: {
      //color: 'black',
      border: '3px solid white',
       
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
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHead: {
      background: '#333',
      color: 'red',
      textAlign: 'center',
      border: '1px solid red',
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
      textAlign: 'center',
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
      filter: 'blur(5px)' // Adding blur effect
    },
    logo: {
      width: '100%',
      height: '200px',
      border: '2px solid red'
    },
    vehicleInfo: {
      margin: '0 auto', /* Center the vehicle info */
      padding: '20px', /* Add padding */
      width: '80%', /* Set width to 80% of container */

    },
    label: {
      fontWeight: 'bold',
      color: 'red',
      width: '100%',
      padding: '1px',
      textTransform: 'uppercase',

    },
    value: {
      color: 'black',
      fontWeight: 'bold',
    },

    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: 'black',
      textAlign: 'center',
      textTransform: 'uppercase',
     },
  };

  return (
    <div style={styles.container}>
      <nav className="sb-topnav navbar navbar-expand " style={{ height: '120px', background: 'black' }}> {/* Increase navbar height */}
        {/* Move the brand section to the right */}
        <div className="d-flex justify-content-start align-items-center me-auto">
          <img src={logo} alt="Nadeeka Auto Service" className="logo" style={{ width: '100px', marginLeft: '5px' }} /> {/* Decrease logo size */}
          <a className="navbar-brand ps-3 me-4" href="/">
            <span className="text-red">N</span>adeeka Auto Care {/* Added span around "N" and text-red class */}
          </a> {/* Added me-4 for margin */}
        </div>

        {/* Main Navigation Links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/" style={{ color: 'white' }}>Home</Link> {/* Set font color to white */}
          </li>
          <li className="nav-item">
                <Link className="nav-link" to={`/create/${customer.cusID}`} style={{ color: 'white' }}>Booking</Link>
              </li>
          {/* <li className="nav-item">
            <Link to="/service" className="nav-link text-blue-500 hover:underline">Services</Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/package" style={{ color: 'white' }}>Package</Link> {/* Set font color to white */}
          </li>
        </ul>

        {/* User Dropdown */}
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
        <nav id="layoutSidenav_nav" >

          <div className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" style={{ backgroundColor: 'gray' }}>
            <div className="sb-sidenav-menu">
              <div className="nav-link">
                <div className="sb-nav-link-icon">
                  {/* <img src={logo} alt="Nadeeka Auto Logo" style={styles.logo} /> */}
                  
                   
                  
                  <button
                    onClick={() => { window.location.href = `/customer/edit/${customer._id}` }}
                    style={styles.navButton}
                  >
                  Edit Profile
                  </button>
                  <button
                    onClick={() => { window.location.href = `/customer/delete/${customer._id}` }}
                    style={styles.navButton}
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={() => { window.location.href = `/feedback/create/${customer.cusID}` }}
                    style={styles.navButton}
                  >
                   Feedback
                  </button>
                   
                </div>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
               Customer
            </div>
          </div>
        </nav>

        <div id="layoutSidenav_content">
           {loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col border-2 border-red-400 rounded-xl w-fit p-4' >




              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <img src={customer.image} alt="Vehicle" style={{maxWidth: '300px', height: '300px', borderRadius: '50%', border: '4px solid red',  padding: '10px' }} />
              </div>


              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>Username</span>
                <span style={styles.value}>{customer.cusID}</span>
              </div>
              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>First Name</span>
                <span style={styles.value}>{customer.firstName}</span>
              </div>
              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>Last Name</span>
                <span style={styles.value}>{customer.lastName}</span>
              </div>
              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>NIC</span>
                <span style={styles.value}>{customer.NIC}</span>
              </div>
              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>Phone</span>
                <span style={styles.value}>{customer.phone}</span>
              </div>
              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>Email</span>
                <span style={styles.value}>{customer.email}</span>
              </div>
              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>Password</span>
                <span style={styles.value}>{customer.password}</span>
              </div>
              <div className='my-4' style={styles.vehicleInfo}>
                <span className='text-xl mr-4 text-gray-500' style={styles.label}>Create Time</span>
                <span style={styles.value}>{new Date(customer.createdAt).toString()}</span>
              </div>
              
              {bookings.length > 0 ? (
                <div>
    <h2 className='text-2xl my-4' style={styles.heading}>Bookings</h2>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHead}>
                        <th style={styles.tableHeader}>Service Date</th>
                        <th style={styles.tableHeader}>Customer Name</th>
                        <th style={styles.tableHeader}>Vehicle Type</th>
                        <th style={styles.tableHeader}>Vehicle Number</th>
                        <th style={styles.tableHeader}>Contact Number</th>
                        <th style={styles.tableHeader}>Email</th>
                        <th style={styles.tableHeader}>Booking Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                          <td style={styles.tableCell}>{booking.Booking_Date}</td>
                          <td style={styles.tableCell}>{booking.Customer_Name}</td>
                          <td style={styles.tableCell}>{booking.Vehicle_Type}</td>
                          <td style={styles.tableCell}>{booking.Vehicle_Number}</td>
                          <td style={styles.tableCell}>{booking.Contact_Number}</td>
                          <td style={styles.tableCell}>{booking.Email}</td>
                          <td style={styles.tableCell}>{booking.Booking_Date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No bookings available for this customer.</p>
              )}

              {payments.length > 0 ? (
                <div>
    <h2 className='text-2xl my-4' style={styles.heading}>PAYMENTS</h2>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHead}>
                        <th style={styles.tableHeader}>Payment ID</th>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Total Amount</th>
                        <th style={styles.tableHeader}>Payment Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                          <td style={styles.tableCell}>{payment.PaymentId}</td>
                          <td style={styles.tableCell}>{payment.PaymentDate}</td>
                          <td style={styles.tableCell}>{payment.totalAmount}</td>
                          <td style={styles.tableCell}>{payment.PaymentMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No payment history available for this customer.</p>
              )}

              {vehicles.length > 0 ? (
                <div>
    <h2 className='text-2xl my-4' style={styles.heading}>VEHICLES</h2>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHead}>
                        <th style={styles.tableHeader}>Vehicle Number</th>
                        <th style={styles.tableHeader}>Vehicle Make</th>
                        <th style={styles.tableHeader}>Vehicle Model</th>
                        <th style={styles.tableHeader}>Vehicle Year</th>
                        <th style={styles.tableHeader}>Engine Details</th>
                        <th style={styles.tableHeader}>Transmission Details</th>
                        <th style={styles.tableHeader}>Vehicle Color</th>
                        <th style={styles.tableHeader}>Vehicle Features</th>
                        <th style={styles.tableHeader}>Condition Assessment</th>
                        <th style={styles.tableHeader}>Vehicle Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                          <td style={styles.tableCell}>{vehicle.Register_Number}</td>
                          <td style={styles.tableCell}>{vehicle.Make}</td>
                          <td style={styles.tableCell}>{vehicle.Model}</td>
                          <td style={styles.tableCell}>{vehicle.Year}</td>
                          <td style={styles.tableCell}>{vehicle.Engine_Details}</td>
                          <td style={styles.tableCell}>{vehicle.Transmission_Details}</td>
                          <td style={styles.tableCell}>{vehicle.Vehicle_Color}</td>
                          <td style={styles.tableCell}>{vehicle.Vehicle_Features.join(', ')}</td>
                          <td style={styles.tableCell}>{vehicle.Condition_Assessment}</td>
                          <td style={styles.tableCell}>{vehicle.Owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No vehicle detail available for this customer.</p>
              )}

              {serviceHistories.length > 0 ? (
                <div>
    <h2 className='text-2xl my-4' style={styles.heading}>SERVICE HISTORIES</h2>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHead}>
                        <th style={styles.tableHeader}>Customer Name</th>
                        <th style={styles.tableHeader}>Allocated Employee</th>
                        <th style={styles.tableHeader}>Vehicle Number</th>
                        <th style={styles.tableHeader}>Service History</th>
                        <th style={styles.tableHeader}>Service Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceHistories.map((service, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                          <td style={styles.tableCell}>{service.Customer_Name}</td>
                          <td style={styles.tableCell}>{service.Allocated_Employee}</td>
                          <td style={styles.tableCell}>{service.Vehicle_Number}</td>
                          <td style={styles.tableCell}>{service.Service_History}</td>
                          <td style={styles.tableCell}>{service.Service_Date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No service details available for this customer.</p>
              )}

              {feedback.length > 0 ? (
                <div>
    <h2 className='text-2xl my-4' style={styles.heading}>FEEDBACKS</h2>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHead}>
                        <th style={styles.tableHeader}>Customer ID:</th>
                        <th style={styles.tableHeader}>Name:</th>
                        <th style={styles.tableHeader}>Email:</th>
                        <th style={styles.tableHeader}>Message:</th>
                        <th style={styles.tableHeader}>Phone Number:</th>
                        <th style={styles.tableHeader}>Employee:</th>
                        <th style={styles.tableHeader}>Star Rating:</th>
                        <th style={styles.tableHeader}>Date of Service:</th>
                        <th style={styles.tableHeader}>Action:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedback.map((feedback, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                          <td style={styles.tableCell}>{feedback.cusID}</td>
                          <td style={styles.tableCell}>{feedback.name}</td>
                          <td style={styles.tableCell}>{feedback.email}</td>
                          <td style={styles.tableCell}>{feedback.message}</td>
                          <td style={styles.tableCell}>{feedback.phone_number}</td>
                          <td style={styles.tableCell}>{feedback.employee}</td>
                          <td style={styles.tableCell}>{feedback.star_rating}</td>
                          <td style={styles.tableCell}>{feedback.date_of_service}</td>
                          <td style={styles.tableCell}><Link to={`/feedback/delete/${feedback._id}`} ><MdOutlineDelete className='text-2x1 text-red-600' /></Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No feedback details available for this customer.</p>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadOneCustomer;