import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Swal from 'sweetalert2';
import backgroundImage from '../../images/t.jpg';

const CreateServiceHistory = () => {
  const [cusID, setCusID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [allocatedEmployee, setAllocatedEmployee] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [milage, setMilage] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingId, setBookingId] = useState('');
  const [nextService, setNextService] = useState('');
  const [serviceHistory, setServiceHistory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [nextServiceHighlighted, setNextServiceHighlighted] = useState(false);

  const navigate = useNavigate();
  const { id: bookingID } = useParams();

  const calculateNextService = (currentMilage) => {
    const serviceInterval = 5000;
    const nextServiceMilage = parseInt(currentMilage) + serviceInterval;
    return nextServiceMilage;
  };

  const handleMilageChange = (e) => {
    const { value } = e.target;
    setMilage(value);
    const nextServiceMilage = calculateNextService(value);
    setNextService(nextServiceMilage.toString() + ' KM');
    // Highlight the next service column
    setNextServiceHighlighted(true);
  };

  useEffect(() => {
    setLoading(true);
    axios.all([
      axios.get('http://localhost:8076/employees'),
      axios.get('http://localhost:8076/bookings'),
      axios.get(`http://localhost:8076/Package`)
    ])
      .then(axios.spread((employeesRes, bookingsRes, packagesRes) => {
        setEmployees(employeesRes.data.data);
        setBookings(bookingsRes.data);
        setPackages(packagesRes.data.data);
        setLoading(false);
      }))
      .catch(error => {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      });
  }, []);

  const handleBookingIDChange = (e) => {
    const selectedBookingId = e.target.value;
    const selectedBooking = bookings.find((booking) => booking.Booking_Id === selectedBookingId);

    if (selectedBooking) {
      setCusID(selectedBooking.cusID);
      setCustomerName(selectedBooking.Customer_Name);
      setVehicleNumber(selectedBooking.Vehicle_Number);
      setSelectedPackage(selectedBooking.selectedPackage);
      setSelectedServices(selectedBooking.selectedServices || []);
    }

    setBookingId(selectedBookingId);
  };

  const handleServiceSelect = (serviceName) => {
    const isServiceSelected = selectedServices.includes(serviceName);
    let updatedSelectedServices;

    if (isServiceSelected) {
      updatedSelectedServices = selectedServices.filter(service => service !== serviceName);
    } else {
      updatedSelectedServices = [...selectedServices, serviceName];
    }

    setSelectedServices(updatedSelectedServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(vehicleNumber)) {
      alert('Please enter a valid vehicle number.');
      return;
    }

    const data = {
      cusID,
      Customer_Name: customerName,
      Allocated_Employee: allocatedEmployee,
      Vehicle_Number: vehicleNumber,
      Milage: milage,
      Package: selectedPackage,
      Booking_Id: bookingId,
      nextService,
      selectedServices,
      Service_History: serviceHistory,
      Service_Date: selectedDate,
    };

    console.log('Request data:', data);

    setLoading(true);
    try {
      await axios.post('http://localhost:8076/serviceHistory/', data);
      setLoading(false);

      // Show alert with next service
      // alert(`Next Service: ${nextService}`);

      // Redirect to user dashboard if necessary (handle on server side)
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Add the Service Successfully!
        Vehicle Number: ${vehicleNumber}
        Your Next Service : ${nextService}
        `,
        showConfirmButton: true,
        confirmButtonColor: '#4CAF50',
        // timer: 2000,
      });

      // Perform navigation after successful login
      navigate('/ServiceHistory');
    } catch (error) {
      setLoading(false);
      console.error('Error creating service history:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      alert('Error creating service history. Please try again.', error);
    }
  };

  const validateVehicleNumber = (value) => {
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    return regex.test(value);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/service')
      .then((response) => {
        setServices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setLoading(false);
      });
  }, []);


  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
    // Make API call with selected value if needed
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.heading}>Create Service History</h1>
          {loading && <Spinner />}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Booking ID</label>
            <select
              style={styles.select}
              value={bookingId}
              onChange={handleBookingIDChange}
            >
              <option value=''>Select a Booking ID</option>
              {bookings.map((B) => (
                <option key={B._id} value={B.Booking_Id}>
                  {B.Booking_Id}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Customer ID</label>
            <input
              style={styles.input1}
              value={cusID}
              disabled
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Customer Name</label>
            <input
              style={styles.input1}
              value={customerName}
              disabled
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Allocated Employee</label>
            <select
              style={styles.select}
              value={allocatedEmployee}
              onChange={(e) => setAllocatedEmployee(e.target.value)}
            >
              <option value=''>Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.Allocated_Employee}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Vehicle Number</label>
            <input
              style={styles.input1}
              value={vehicleNumber}
              disabled
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Milage</label>
            <input
              type='number'
              style={styles.input}
              value={milage}
              onChange={handleMilageChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Package</label>
            <select
              value={selectedPackage}
              onChange={handlePackageChange}
              style={styles.select}
            >
              <option value=''>Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg.pakgname}>
                  {pkg.pakgname}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Selected Services</label>
            <div style={styles.servicesContainer}>
              {services.map(service => (
                <button
                  key={service._id}
                  type="button" // Prevents form submission
                  style={{ ...styles.serviceButton, ...(selectedServices.includes(service.Servicename) && { backgroundColor: 'red', color: 'white' }) }}
                  onClick={() => handleServiceSelect(service.Servicename)}
                >
                  {service.Servicename}
                </button>
              ))}
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Next Service</label>
            <input
              type='text'
              style={{ ...styles.input1, ...(nextServiceHighlighted && styles.highlightedInput) }}
              value={nextService}
              onChange={handleMilageChange}
              disabled
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Service History</label>
            <input
              type='text'
              style={styles.input}
              value={serviceHistory}
              onChange={(e) => setServiceHistory(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Service Date</label>
            <input
              type='datetime-local'
              style={styles.input}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={getTodayDate()}
            />
          </div>
          <div style={styles.inputGroup}>
            <button
              style={styles.button}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Service History'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  },



  formContainer: {
    width: '50%',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    padding: '20px',
    bordercolor: 'red',
    margin: '10px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '800px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white'
  },
  inputGroup: {
    marginTop: '20px',
    width: '100%'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    flexDirection: 'column',
    fontSize: '1.2rem',
    color: 'red',
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    display: 'block',
    textTransform: 'uppercase',
  },
  select: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    width: '100%',
    color: 'black',
    fontSize: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'block',
    textAlign: 'center',

    marginBottom: '10px',

  


  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.25rem',
    borderRadius: '0.25rem',
    fontSize: '1.2rem',
    color: 'black',
    textAlign: 'center',
    width: '100%',
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    border: '1px solid #ccc',
    background: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    
    

  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  servicesContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  serviceButton: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'flex',
    


  }, input1: {
    width: '100%',
    padding: '10px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    color: 'rgba(255, 255, 125, 0.8)',
    textAlign: 'center',

  },

  highlightedInput: {
    backgroundColor: 'pink',
    color: 'black',
    border: 'red',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',



  }
};

export default CreateServiceHistory;
