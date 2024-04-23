import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import backgroundImage from '../../images/t.jpg';




export default function ReadOneBooking() {

  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/bookings/${id}`)
      .then((response) => {

        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

      });

  }, []);

  return (


    <div style={styles.container}>
      <BackButton destination='/booking/dashboard' /> 
      <h1 style={styles.heading}>Booking Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.employeeContainer}>
          <div style={styles.employeeInfo}>
            <div style={styles.employeeField}>
              <span style={styles.label}>Booking Date :</span>
              <span style={styles.value}>{booking.Booking_Date}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Booking ID :</span>
              <span style={styles.value}>{booking.Booking_Id}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Customer ID :</span>
              <span style={styles.value}>{booking.cusID}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Package Name :</span>
              <span style={styles.value}>{booking.selectedPackage}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Service Names :</span>
              <span style={styles.value}>{booking.selectedServices}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Customer Name :</span>
              <span style={styles.value}>{booking.Customer_Name}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Vehicle Type :</span>
              <span style={styles.value}>{booking.Vehicle_Type}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Vehicle Number :</span>
              <span style={styles.value}>{booking.Vehicle_Number}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Contact No :</span>
              <span style={styles.value}>{booking.Contact_Number}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Email :</span> 
              <span style={styles.value}>{booking.Email}</span>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
    },
    heading: {
      textAlign: 'center',
      fontSize: '3rem',
      marginBottom: '30px',
      color: '#fff',
    },
    employeeContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 4px 6px rgba(0, 0, 4, 0.6)',
      borderRadius: '10px',
      backgroundColor: 'rgba(5, 4, 2, 0.8)',
      padding: '20px',
      border: '2px solid red',
      textAlign: 'left',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '60vh', 
    },
    employeeInfo: {
      margin: '0 auto',
      padding: '10px',
      width: '80%',
    },
    employeeField: {
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      fontWeight: 'bold',
      color: 'red',
      width: '100%',
      padding: '1px',
      textTransform: 'uppercase',
    },
    value: {
      width : '100%',
      color: 'white',
    },
  };



