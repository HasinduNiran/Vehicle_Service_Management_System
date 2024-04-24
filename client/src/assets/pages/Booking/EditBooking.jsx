import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import backgroundImage from '../../images/t.jpg';
import { useNavigate, useParams } from 'react-router-dom';


export default function EditBooking() {

  const [Booking_Date, setBooking_Date] = useState('');
  const [Customer_Name, setCustomer_Name] = useState('');
  const [Vehicle_Type, setVehicle_Type] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Contact_Number, setContact_Number] = useState('');
  const [Email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [Booking_Id, setBooking_Id] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState('');
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios.get(`http://localhost:8076/bookings/${id}`)

      .then((response) => {
        const bookingDate = response.data.Booking_Date.substring(0, 10);
        setBooking_Date(bookingDate);
        setCustomer_Name(response.data.Customer_Name);
        setVehicle_Type(response.data.Vehicle_Type);
        setVehicle_Number(response.data.Vehicle_Number);
        setContact_Number(response.data.Contact_Number);
        setEmail(response.data.Email);
        setBooking_Id(response.data.Booking_Id);
        setSelectedPackage(response.data.selectedPackage);
        setSelectedServices(response.data.selectedServices);
        setLoading(false);


      }).catch((error) => {

        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/Package`)
      .then((response) => {
        setPackages(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);

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

  const handleServiceSelect = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter(service => service !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleSaveBooking = () => {
    const data = {

      selectedServices,
      selectedPackage,
      Customer_Name,
      Vehicle_Type,
      Vehicle_Number,
      Contact_Number,
      Email



    };

    setLoading(true);
    axios.put(`http://localhost:8076/bookings/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/booking/dashboard');

      })
      .catch((error) => {

        setLoading(false);
        alert('An error happened. Please Check Console for more information');
        console.log(error);

      });


  };


  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <BackButton destination='/booking/dashboard' />
        <h1 style={styles.heading}>Edit Booking</h1>
        {loading ? <Spinner /> : ''}
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Booking Date</label>
            <input
              type='date'
              value={Booking_Date}
              readOnly
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Booking ID</label>
            <input
              type='text'
              value={Booking_Id}
              readOnly
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Package</label>
            <select
              value={selectedPackage}
              onChange={handlePackageChange}
              style={styles.input}
            >
              <option value=''>Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg.pakgname}>
                  {pkg.pakgname}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Includes</label>
            <div style={styles.servicesContainer}>
              {services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => handleServiceSelect(service.Servicename)}
                  style={{ ...styles.serviceButton, ...(selectedServices.includes(service.Servicename) && { backgroundColor: 'red', color: 'white' }) }}
                >
                  {service.Servicename}
                </button>
              ))}
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Customer Name</label>
            <input
              type='text'
              value={Customer_Name || ""}
              onChange={(e) => setCustomer_Name(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Vehicle Type</label>
            <select
              value={Vehicle_Type}
              onChange={(e) => setVehicle_Type(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Vehicle Type</option>
              <option value="Van">Van</option>
              <option value="Car">Car</option>
              <option value="Bus">Bus</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Vehicle Number</label>
            <input
              type='text'
              value={Vehicle_Number}
              onChange={(e) => setVehicle_Number(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Number</label>
            <input
              type='text'
              value={Contact_Number}
              onChange={(e) => setContact_Number(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type='text'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleSaveBooking}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};
const styles = {
  select: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'black',

    outline: 'none'


  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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

  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

    marginBottom: '1.5rem',
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
    backgroundColor: 'black',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#1B1B1B',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
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
    gap: '10px',
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
};


