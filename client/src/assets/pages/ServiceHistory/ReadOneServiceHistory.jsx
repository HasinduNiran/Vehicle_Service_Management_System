import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import backgroundImage from '../../images/t.jpg';

const ReadOneServiceHistory = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/ServiceHistory/${id}`)
      .then((res) => {
        setServiceHistory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Service History Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.card}>
          <div style={styles.cardBody}>
            <p style={styles.item}>
              <span style={styles.label}>Customer Name:</span><span style={styles.text} > {serviceHistory.Customer_Name}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Customer Email:</span><span style={styles.text} > {serviceHistory.Customer_Email}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Allocated Employee:</span><span style={styles.text} > {serviceHistory.Allocated_Employee}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Vehicle Number:</span><span style={styles.text} > {serviceHistory.Vehicle_Number}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Service History:</span><span style={styles.text} > {serviceHistory.Service_History}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Date Of Service:</span><span style={styles.text} > {serviceHistory.Service_Date}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Milage:</span><span style={styles.text} > {serviceHistory.Milage}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Package:</span><span style={styles.text} > {serviceHistory.Package}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Booking ID:</span><span style={styles.text} > {serviceHistory.Booking_Id}</span>
            </p>
            <p style={styles.item}>
              <span style={styles.label}>Next Service:</span><span style={styles.text} > {serviceHistory.nextService}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

    marginBottom: '1.5rem',
  },
  card: {
    width: '50%',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    padding: '20px',
    bordercolor: 'red',
    margin: '10px',
    textAlign: 'center',
    

  },
  cardBody: {
    padding: '2rem',
  },
  item: {
    marginBottom: '1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#fff',
    display: 'flex',
    
    alignItems: 'center',
    justifyContent:'center',
  },
  text: {
    marginRight: '0.5rem',
    color: '#fff',
    fontSize: '1.5rem',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
  label: {
    
    fontWeight: 'bold',
    color: 'red',
    fontSize: '1.5rem',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },

};

export default ReadOneServiceHistory;
