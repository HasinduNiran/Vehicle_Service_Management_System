import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import backgroundImage from '../../images/t.jpg';
import { useNavigate, useParams } from 'react-router-dom';


export default function EditBookingLimit() {

  const [Booking_Date, setBooking_Date] = useState('');
  const [Booking_Limit, setBooking_Limit] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios.get(`http://localhost:8076/bookinglimits/${id}`)

      .then((response) => {
        const bookingDate = response.data.Booking_Date.substring(0, 10);
        setBooking_Date(bookingDate);
        setBooking_Limit(response.data.Booking_Limit);
        setLoading(false);


      }).catch((error) => {

        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);



  const handleSaveBookingLimit = () => {
    const data = {
        Booking_Date,
        Booking_Limit

    };

    setLoading(true);
    axios.put(`http://localhost:8076/bookinglimits/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/booking/bookinglimitdashboard');

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
        <BackButton destination='/booking/bookinglimitdashboard' />
        <h1 style={styles.heading}>Edit Booking Limits</h1>
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
            <label style={styles.label}>Booking Limit</label>
            <input
              type='text'
              value={Booking_Limit}
              onChange={(e) => setBooking_Limit(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleSaveBookingLimit}>
              Save
            </button>
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
    minHeight: '100vh',
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


