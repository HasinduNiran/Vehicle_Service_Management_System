import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import BackButton from '../../components/BackButton';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import backgroundImage from '../../images/t.jpg';

const RetrieveExistingInventory = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [retrieveAmount, setRetrieveAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/inventory/${id}`, {
      params: {
        fields: ['Name', 'Quantity'].join(',')
      }
    })
      .then((response) => {
        const data = response.data;
        setName(data.Name);
        setQuantity(data.Quantity);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`An error happened. Please check console`);
        console.log(error);
      });
  }, [id]);

  const handleRetrieve = () => {
    if (retrieveAmount > 0) {
      const updatedQuantity = parseInt(quantity) - retrieveAmount;
      if (updatedQuantity >= 0) {
        setQuantity(updatedQuantity);
        const data = {
          Quantity: updatedQuantity
        };
        axios
          .put(`http://localhost:8076/inventory/${id}`, data)
          .then(() => {
            setRetrieveAmount(0);
            // Display SweetAlert2 when item is successfully removed
            Swal.fire("Success!", "Item retrieved successfully!", "success");
          })
          .catch((error) => {
            alert('An error happened while updating quantity.');
            console.log(error);
          });
      } else {
        alert('Cannot retrieve more than current quantity.');
      }
    } else {
      alert('Please enter a valid retrieve amount.');
    }
  };

  const handleSave = () => {
    navigate(`/inventory/get/${id}`);
  };

  return (
    <div style={styles.container}>
      <BackButton destination={`/inventory/get/${id}`} />
      
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
      <h1 style={styles.heading}>View Inventory</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            readOnly
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity</label>
          <input
            type="number"
            value={quantity}
            readOnly
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Retrieve Amount</label>
          <input
            type="number"
            value={retrieveAmount}
            onChange={(e) => setRetrieveAmount(parseInt(e.target.value))}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleRetrieve}>
            Retrieve
          </button>
          <button style={styles.button} onClick={handleSave}>
            Save
          </button>
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
    marginBottom: '20px' // Add margin bottom to create space between heading and form
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
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.2rem',
    marginBottom: '10px',
    textAlign: 'left',
    display: 'block',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px' // Add margin top to create space between buttons and form
  },
  button: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.8s',
    marginRight: '10px' // Add margin right to create space between buttons
  },
};

export default RetrieveExistingInventory;
