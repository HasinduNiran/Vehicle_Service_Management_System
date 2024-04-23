import React,{useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

import backgroundImage from '../../images/Pback21.jpg';

const DeleteInvoice = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle the DeleteInvoice 
  const handleDeletePaymentInvoice = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8076/PaymentInvoice/${id}`)
      .then(() => {
        
        setLoading(false);
        navigate('/PaymentInvoice/show');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console');
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
     <div style={styles.container1}>
        <div style={styles.title}>
          <h1 style={styles.heading}>Delete Invoice Record</h1>
       {/* Pass the destination URL here */}
      
       </div>
        <p style={styles.p2}>This Invoice record will be deleted permanently.<br></br>
         Are you sure you want to delete this Invoice Record</p><br></br>
        <div style={styles.buttonContainer}>
          <button style={styles.deleteButton} onClick={handleDeletePaymentInvoice}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <Link to={'/payments/pdashboard'} style={styles.cancelButton}>Cancel</Link>
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
    color: '#EE4B2B',
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

export default DeleteInvoice;
