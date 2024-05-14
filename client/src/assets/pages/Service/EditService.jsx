import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';

const EditService = () => {
  const [Servicename, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/Service/${id}`)
      .then((response) => {
        setServiceName(response.data.Servicename);
        setPrice(response.data.Price); // Set the price
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      Servicename,
      Price: price // Include the price in the data object
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/Service/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/Service/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Edit Service details</h1>
        {loading ? <Spinner /> : ''}
        <div>
          <div>
            <form style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="Servicename" style={styles.label}>Service Name</label>
                <input
                  type="text"
                  style={styles.input}
                  className="form-control"
                  value={Servicename}
                  onChange={(e) => setServiceName(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="price" style={styles.label}>Price</label>
                <input
                  type="text"
                  style={styles.input}
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button type="submit" style={styles.button} onClick={handleEdit}>Submit</button>
            </form>
          </div>
        </div>
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

export default EditService;
