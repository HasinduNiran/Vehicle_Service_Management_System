import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';
import BackButton from '../../components/BackButton';

const EditServiceHistory = () => {
  const [BookingId, setBookingId] = useState('');
  const [cusID, setcusID] = useState('');
  const [Customer_Name, setCustomer_Name] = useState('');
  const[Customer_Email, setCustomer_Email] = useState('');
  const [Allocated_Employee, setAllocated_Employee] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Milage, setMilage] = useState('');
  const [Selected_Package, setSelected_Package] = useState('');
  const [Selected_Services, setSelected_Services] = useState([]);
  const [Next_Service, setNext_Service] = useState('');
  const [Service_History, setService_History] = useState('');
  const [Service_Date, setService_Date] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);

  // Validation function for Vehicle Number
  const validateVehicleNumber = (value) => {
    // Regular expression for alphanumeric with hyphen and space
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    // Check if the value matches the pattern
    return value.match(regex);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .all([
        axios.get('http://localhost:8076/employees'),
        axios.get(`http://localhost:8076/ServiceHistory/${id}`),
        axios.get('http://localhost:8076/service'),
        axios.get(`http://localhost:8076/Package`)
      ])
      .then(axios.spread((employeesRes, serviceHistoryRes, serviceRes, packageRes) => {
        setEmployees(employeesRes.data.data);
        
        // Destructure the service history data
        const {
          Booking_Id,
          cusID,
          Customer_Name,
          Customer_Email,
          Allocated_Employee,
          Vehicle_Number,
          Milage,
          Package,
          selectedServices,
          nextService,
          Service_History,
          Service_Date
        } = serviceHistoryRes.data;
  
        // Convert the date and time to the 'YYYY-MM-DD' format
        const formattedServiceDateTime = Service_Date ? new Date(Service_Date).toISOString().slice(0, 16) : '';
  
        // Set the states
        setBookingId(Booking_Id);
        setcusID(cusID);
        setCustomer_Name(Customer_Name);
        setCustomer_Email(Customer_Email);
        setAllocated_Employee(Allocated_Employee);
        setVehicle_Number(Vehicle_Number);
        setMilage(Milage);
        setSelected_Package(Package);
        setSelected_Services(selectedServices || []); // Ensure Selected_Services is always an array
        setNext_Service(nextService);
        setService_History(Service_History);
        setService_Date(formattedServiceDateTime); // Set the formatted date
  
        setServices(serviceRes.data.data);
        setPackages(packageRes.data.data);
        setLoading(false);
      }))
      .catch(error => {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      });
  }, [id]);
  
  const handlePackageChange = (e) => {
    setSelected_Package(e.target.value);
    // Make API call with selected value if needed
  };

  const handleEditService = async (e) => {
    e.preventDefault();
  
    if (!validateVehicleNumber(Vehicle_Number)) {
      alert('Please enter a valid vehicle number.');
      return;
    }
  
    const data = {
      Booking_Id: BookingId,
      cusID: cusID,
      Customer_Name: Customer_Name,
      Customer_Email: Customer_Email,
      Allocated_Employee: Allocated_Employee,
      Vehicle_Number: Vehicle_Number,
      Milage: Milage,
      Package: Selected_Package,
      selectedServices: Selected_Services,
      nextService: Next_Service,
      Service_History: Service_History,
      Service_Date: Service_Date
    };
  
    setLoading(true);
    try {
      await axios.put(`http://localhost:8076/ServiceHistory/${id}`, data);
      setLoading(false);
      navigate('/ServiceHistory/dashboard');
    } catch (error) {
      setLoading(false);
      console.error('Error updating service history:', error);
      alert('Error updating service history. Please try again.',error);
    }
  };

  const handleServiceSelect = (serviceName) => {
    const isServiceSelected = Selected_Services.includes(serviceName);
    let updatedSelectedServices;

    if (isServiceSelected) {
      // If the service is already selected, remove it from the list
      updatedSelectedServices = Selected_Services.filter(service => service !== serviceName);
    } else {
      // If the service is not selected, add it to the list
      updatedSelectedServices = [...Selected_Services, serviceName];
    }

    setSelected_Services(updatedSelectedServices);
  };

  return (
    <div style={styles.container}>
      <BackButton destination='/servicehistory/dashboard' />
      <div style={styles.formContainer}>
        <form onSubmit={handleEditService} style={styles.form}>
          <h1 style={styles.heading}>Edit Service History</h1>
          <div style={styles.formGroup}>
            <label style={styles.label}>Booking ID</label>
            <input
              type="text"
              style={styles.input1}
              value={BookingId}
              onChange={(e) => setBookingId(e.target.value)}
              disabled
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Customer ID</label>
            <input
              type="text"
              style={styles.input1}
              value={cusID}
              onChange={(e) => setcusID(e.target.value)}
              disabled
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Customer Name</label>
            <input
              type="text"
              style={styles.input1}
              value={Customer_Name}
              onChange={(e) => setCustomer_Name(e.target.value)}
              disabled
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Customer Email</label>
            <input
              type="email"
              style={styles.input1}
              value={Customer_Email}
              onChange={(e) => setCustomer_Email(e.target.value)}
              disabled
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Allocated Employee</label>
            <select
              style={styles.input}
              value={Allocated_Employee}
              onChange={(e) => setAllocated_Employee(e.target.value)}
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.employeeName}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Vehicle Number</label>
            <input
              type="text"
              style={styles.input}
              value={Vehicle_Number}
              onChange={(e) => setVehicle_Number(e.target.value)}
              maxLength={8}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Milage</label>
            <input
              type="number"
              style={styles.input}
              value={Milage}
              onChange={(e) => setMilage(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Package</label>
            <select
              value={Selected_Package}
              onChange={handlePackageChange}
              style={styles.input}
            >
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg.pakgname}>
                  {pkg.pakgname}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Selected Services</label>
            <div style={styles.serviceButtonsContainer}>
              {services.map(service => (
                <button
                  key={service._id}
                  type="button" // Prevents form submission
                  style={Object.assign({}, styles.serviceButton, Selected_Services.includes(service.Servicename) ? styles.selectedServiceButton : null)}
                  onClick={() => handleServiceSelect(service.Servicename)}
                >
                  {service.Servicename}
                </button>
              ))}
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Next Service</label>
            <input
              type="text"
              style={styles.input}
              value={Next_Service}
              onChange={(e) => setNext_Service(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Service History</label>
            <input
              type="text"
              style={styles.input}
              value={Service_History}
              onChange={(e) => setService_History(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Service Date</label>
            <input
              type="datetime-local"
              style={styles.input}
              value={Service_Date}
              onChange={(e) => setService_Date(e.target.value)}
              placeholder="YYYY-MM-DD"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div style={styles.formGroup}>
            <button
              type="submit"
              style={styles.submitButton}
            >
              {loading ? 'Updating...' : 'Update Service History'}
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
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }, heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

    marginBottom: '1.5rem',
  },
  formContainer: {
    width: '50%',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    border: '2px solid red', // Add a red border
    borderColor: 'red',
    margin: '10px',
    textAlign: 'center',
    position: 'relative', // Add this line for absolute positioning of the line
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

  formGroup: {
    marginBottom: '1.5rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
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
    
  }, input1:{
    width: '100%',
    padding: '10px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    color: 'rgba(255, 255, 125, 0.8)',
    textAlign: 'center',

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
  },
  serviceButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
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
  },
  selectedServiceButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default EditServiceHistory;
