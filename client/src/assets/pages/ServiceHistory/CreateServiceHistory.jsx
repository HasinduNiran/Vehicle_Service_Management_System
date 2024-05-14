import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import backgroundImage from '../../images/t.jpg';
import emailjs from 'emailjs-com';

const CreateServiceHistory = () => {
  const [cusID, setCusID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customeremail, setCustomerEmail] = useState('');
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
      axios.get('http://localhost:8076/Package'),
      axios.get('http://localhost:8076/service')
    ])
      .then(axios.spread((employeesRes, bookingsRes, packagesRes, servicesRes) => {
        setEmployees(employeesRes.data.data);
        setBookings(bookingsRes.data);
        setPackages(packagesRes.data.data);
        setServices(servicesRes.data.data);
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
    // Fetch service history for the selected booking ID
    // Here you should make a request to fetch service history based on the selected booking ID
    // and update the `serviceHistory` state accordingly
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

  const sendEmailToCustomer = () => {
    const emailConfig = {
      serviceID: 'service_3p901v6',
      templateID: 'template_cwl7ahv',
      userID: '-r5ctVwHjzozvGIfg'
  };

  emailjs.send(
    emailConfig.serviceID,
    emailConfig.templateID,
    {
      to_email:  `${customeremail}`,
      message: `Vehicle Number: ${vehicleNumber}
      Next Service: ${nextService}
      Customer Email: ${customeremail}
      Send Email to Customer?`,
    },
    emailConfig.userID
  )

  
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(vehicleNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Vehicle Number',
        text: 'Please enter a valid vehicle number.',
      });
      return;
    }

    const data = {
      cusID,
      Customer_Name: customerName,
      Customer_Email: customeremail,
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
      const response1 = await axios.post('http://localhost:8076/serviceHistory/', data);
      console.log('Response:', response1.data.message);
      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Service Created Successfully!',
        html: `Vehicle Number: ${vehicleNumber}<br>
              Next Service: ${nextService}<br>
              Customer Email: ${customeremail}<br><br>
              Send Email to Customer?`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Send Email',
        cancelButtonText: 'No, Close',
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle email sending logic here
          sendEmailToCustomer();
        }
      });


      // Perform navigation after successful submission
      navigate('/ServiceHistory/dashboard');
    } catch (error) {
      setLoading(false);
      console.error('Error creating service history:', error);
      if (error.response.data.message == 'Vehicle not found. Please register the vehicle first.') {
        console.error('Server responded with:', error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Vehicle not found. Please register the vehicle first.',
        });
      }
      if (error.response.data.message == 'This booking ID already has a service history associated with it.') {
        console.error('Server responded with:', error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'This booking ID already has a service history associated with it.',
        });
      }
      console.log('Response:', response1.data.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error creating service history. Check mileage.',
      });
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

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
    // Make API call with selected value if needed
  };

  return (
    <div style={styles.container}>
      <BackButton destination='/servicehistory/dashboard' />
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
            <label style={styles.label}>Customer Email</label>
            <input
              style={styles.input1}
              value={customeremail}
              onChange={(e) => setCustomerEmail(e.target.value)}
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
              min={0}
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
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    border: '2px solid red',
    borderColor: 'red',
    margin: '10px',
    textAlign: 'center',
    position: 'relative',
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
    color: 'white',
  },
  inputGroup: {
    marginTop: '20px',
    width: '100%',
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
    flexWrap: 'wrap',
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
  },
  input1: {
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
  },
  message: {
    color: 'white',
    fontSize: '1rem',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default CreateServiceHistory;
