import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';

const CreateService = () => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      Servicename: serviceName,
      Price: price // Added price to the data object
    };
    setLoading(true);
    try {
      await axios.post('http://localhost:8076/Service/', data);
      setLoading(false);
      navigate('/Service/dashboard');
    } catch (error) {
      setLoading(false);
      alert('An error occurred. Please check the console.');
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <div className="p-4" style={styles.formContainer}>
        {loading && <Spinner />}
        <h1 style={styles.heading}>Add New Service</h1>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Service Name</label>
            <input
              type="text"
              style={styles.input}
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Price</label>
            <input
              type="text" // Assuming price is entered as text, adjust as needed
              style={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button type="button" style={styles.button} onClick={handleSubmit}>
            Submit
          </button>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  button: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '15px 10px',
  },
};

export default CreateService;
