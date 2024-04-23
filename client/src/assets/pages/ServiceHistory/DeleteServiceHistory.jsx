import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';

const DeleteServiceHistory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:8076/servicehistory/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/ServiceHistory/dashboard');
      }).catch((error) => {
        setLoading(false);
        console.error('Error deleting service', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.container1}>
        <div style={styles.title}>
          <h1 style={styles.heading}>Delete Service History</h1>
        </div>
        <p style={styles.p2}>Service History will be deleted permanently.<br></br>
         Are you sure you want to delete this service history?</p><br></br>
        <div style={styles.buttonContainer}>
          <button style={styles.deleteButton} onClick={handleDelete}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <Link to={'/ServiceHistory/dashboard'} style={styles.cancelButton}>Cancel</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure full height of the viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    width: '50%',
    backgroundColor: 'rgba(7, 4, 6, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 7, 8, 0.5)',
    padding: '20px',
    bordercolor: 'red',
    margin: '10px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: 'red',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    marginRight: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: 'blue',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
  },p2:{
    color: 'white',
    textAlign: 'center',
  },
};

export default DeleteServiceHistory;
