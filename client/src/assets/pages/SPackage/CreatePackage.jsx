import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import backgroundImage from '../../images/t.jpg';

const CreatePackage = () => {
  const [pakgname, setPakgname] = useState('');
  const [pkgdescription, setPkgdescription] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [Price, setPrice] = useState(0);
  const [exp, setExp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSavePackage = () => {
    if (!pakgname || !pkgdescription) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Package name and description must be provided.',
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
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

    axios.post('http://localhost:8076/Package', data)
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={styles.container}>
      {loading && <Spinner />}

      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Create Package</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Package Name</label>
          <input
            type="text"
            value={pakgname}
            onChange={(e) => setPakgname(e.target.value)}
            style={styles.input}
          />
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
                }}
                onClick={() => handleServiceSelect(service.Servicename)}
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
          <label style={styles.label}>Expiration Date</label>
          <input
            type="date"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            style={styles.input}
            min={today} // Ensure the min attribute is set correctly
          />
        </div>
        <button style={styles.button} onClick={handleSavePackage}>
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
    backgroundImage: `url(${backgroundImage})`,
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
    border: '2px solid red',
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
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '2px 2px',
    fontSize: '0.8rem',
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

export default CreatePackage;
