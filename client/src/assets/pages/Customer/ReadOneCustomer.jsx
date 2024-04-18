import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import logo from '../../images/logo.jpg';
import backgroundImage from '../../images/t.jpg';
import Header from '../../components/Header'; 

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
<div className="sb-nav-fixed">
<nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <Header/>
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
                onClick={() => { window.location.href = '/ServiceHistory' }}
                style={styles.navButton}
              >
                View History
              </button>
              <div
                style={styles.navButton}
              >
                {/* <VehicleReport filteredVehicles={filteredVehicles} /> */}
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
      <h1 className='text-3xl my-4'>Show Customer</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Customer Number</span>
            <span>{customer._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>First Name</span>
            <span>{customer.firstName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Name</span>
            <span>{customer.lastName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>NIC</span>
            <span>{customer.NIC}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Phone</span>
            <span>{customer.phone}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email</span>
            <span>{customer.email}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Username</span>
            <span>{customer.username}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Password</span>
            <span>{customer.password}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(customer.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(customer.updatedAt).toString()}</span>
          </div>

          {bookings.length > 0 ? (
            <div>
              <h2 className='text-2xl my-4'>Bookings</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Service Date</th>
                    <th>Customer Name</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Number</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.Booking_Date}</td>
                      <td>{booking.Customer_Name}</td>
                      <td>{booking.Vehicle_Type}</td>
                      <td>{booking.Vehicle_Number}</td>
                      <td>{booking.Contact_Number}</td>
                      <td>{booking.Email}</td>
                      <td>{booking.Booking_Date}</td>
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
              <h2 className='text-2xl my-4'>Payments</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.PaymentId}</td>
                      <td>{payment.PaymentDate}</td>
                      <td>{payment.totalAmount}</td>
                      <td>{payment.PaymentMethod}</td>
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
              <h2 className='text-2xl my-4'>Vehicles</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Vehicle Number</th>
                    <th>Vehicle Make</th>
                    <th>Vehicle Model</th>
                    <th>Vehicle Year</th>
                    <th>Engine Details</th>
                    <th>Transmission Details</th>
                    <th>Vehicle Color</th>
                    <th>Vehicle Features</th>
                    <th>Condition Assessment</th>
                    <th>Vehicle Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle, index) => (
                    <tr key={index}>
                      <td>{vehicle.Register_Number}</td>
                      <td>{vehicle.Make}</td>
                      <td>{vehicle.Model}</td>
                      <td>{vehicle.Year}</td>
                      <td>{vehicle.Engine_Details}</td>
                      <td>{vehicle.Transmission_Details}</td>
                      <td>{vehicle.Vehicle_Color}</td>
                      <td>{vehicle.Vehicle_Features.join(', ')}</td>
                      <td>{vehicle.Condition_Assessment}</td>
                      <td>{vehicle.Owner}</td>
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
              <h2 className='text-2xl my-4'>Service Histories</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Allocated Employee</th>
                    <th>Vehicle Number</th>
                    <th>Service History</th>
                    <th>Service Date</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceHistories.map((service, index) => (
                    <tr key={index}>
                      <td>{service.Customer_Name}</td>
                      <td>{service.Allocated_Employee}</td>
                      <td>{service.Vehicle_Number}</td>
                      <td>{service.Service_History}</td>
                      <td>{service.Service_Date}</td>
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
              <h2 className='text-2xl my-4'>Feedback</h2>
              <table className='table'>
                <thead>
                  <tr>
                  <th>Customer ID:</th>
                    <th>Name:</th>
                    <th>Email:</th>
                    <th>Message:</th>
                    <th>Phone Number:</th>
                    <th>Employee:</th>
                    <th>Star Rating:</th>
                    <th>Date of Service:</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((feedback, index) => (
                    <tr key={index}>
                       <td>{feedback.cusID}</td>
                      <td>{feedback.name}</td>
                      <td>{feedback.email}</td>
                      <td>{feedback.message}</td>
                      <td>{feedback.phone_number}</td>
                      <td>{feedback.employee}</td>
                      <td>{feedback.star_rating}</td>
                      <td>{feedback.date_of_service}</td>
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
