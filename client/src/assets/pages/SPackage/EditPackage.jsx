import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';
import Swal from 'sweetalert2';

const EditPackage = () => {
  const [pakgname, setPakgname] = useState('');
  const [pkgdescription, setPkgdescription] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [Price, setPrice] = useState(0);
  const [exp, setExp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    // Fetch package details
    axios.get(`http://localhost:8076/package/${id}`)
      .then((response) => {
        const packageData = response.data;
        setPakgname(packageData.pakgname);
        setPkgdescription(packageData.pkgdescription);
        setSelectedServices(packageData.includes);
        setPrice(packageData.Price);
        setExp(packageData.exp);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching package details:', error);
        setLoading(false);
      });

    // Fetch services
    axios.get('http://localhost:8076/service')
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, [id]);

  const handleServiceSelect = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter(service => service !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleEditPackage = () => {
    const today = new Date().toISOString().split('T')[0];
    if(!pakgname){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Package Name',
        text: 'Please enter a package name.',
      });
      return;
    }
    if(!pkgdescription){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Package Description',
        text: 'Please enter a package description.',
      });
      return;
    }
    if (selectedServices.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Services',
        text: 'Please select at least one service.',
      });
      return;
    }
    
    if(Price <= 0||!Price){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price.',
      });
      return;
    }
    if (exp < today) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'The expiration date cannot be in the past.',
      });
      return;
    }
    const data = {
      pakgname,
      pkgdescription,
      includes: selectedServices,
      Price,
      exp
    };
    setLoading(true);

    axios.put(`http://localhost:8076/package/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/package/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <div style={styles.formContainer}>
      <h1 style={styles.heading}>Edit Package</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Package Name</label>
          <input
            type="text"
            value={pakgname}
            onChange={(e) => setPakgname(e.target.value)}
            style={styles.input}          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            value={pkgdescription}
            onChange={(e) => setPkgdescription(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Includes</label>
          <div style={styles.buttonContainer}>
            {services.map(service => (
              <button
                key={service._id}
                style={{
                  ...styles.includeButton,
                  backgroundColor: selectedServices.includes(service.Servicename) ? 'blue' : 'gray',
                  color: selectedServices.includes(service.Servicename) ? 'white' : 'black',
                }}                onClick={() => handleServiceSelect(service.Servicename)}
              >
                {service.Servicename}
              </button>
            ))}
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Price</label>
          <input
            type="number"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Expiry Date</label>
          <input
            type="date"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            style={styles.input}
            min={today}
          />
        </div>

        <button style={styles.button} onClick={handleEditPackage}>
          Save
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Fixed backgroundImage syntax
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  formContainer: {
    width: '50%',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    margin: '10px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    fontSize: '1.2rem',
    color: 'red',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'black',
    color: 'white',
  },
  includeButton: {
    backgroundColor: 'gray',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px', // Adjusted padding
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '2px 2px', // Adjusted margin
    fontSize: '0.8rem', // Reduced font size
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '0 10px',
  },
};
export default EditPackage;
