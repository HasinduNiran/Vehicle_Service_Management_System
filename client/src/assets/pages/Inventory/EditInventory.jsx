import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import backgroundImage from '../../images/t.jpg';
import BackButton from '../../components/BackButton';

const EditInventory = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasedPrice, setPurchasedPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/inventory/${id}`)
      .then((response) => {
        const data = response.data;
        setName(data.Name);
        setLocation(data.Location);
        setQuantity(data.Quantity);
        setPurchasedPrice(data.PurchasedPrice);
        setSellPrice(data.SellPrice);
        setSupplierName(data.SupplierName);
        setSupplierPhone(data.SupplierPhone);
        setSupplierEmail(data.SupplierEmail);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error happened. Please check console.',
        });
        console.log(error);
      });
  }, [id]);

  const handleEditInventory = () => {
    // Frontend validation
    const negativeFields = [];
    
    if (!name || !quantity || !purchasedPrice || !sellPrice || !supplierName || !supplierPhone || !supplierEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields.',
      });
      return;
    }
  
    if (isNaN(quantity) || isNaN(purchasedPrice) || isNaN(sellPrice)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Quantity, purchased price, and sell price must be valid numbers.',
      });
      return;
    }
  
    if (quantity < 0) {
      negativeFields.push('Quantity');
    }
  
    if (purchasedPrice < 0) {
      negativeFields.push('Purchased Price');
    }
  
    if (sellPrice < 0) {
      negativeFields.push('Sell Price');
    }
  
    if (sellPrice < purchasedPrice) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sell price must be equal to or greater than the purchased price.',
      });
      return;
    }
  
    if (negativeFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `The following fields cannot be negative: <br>${negativeFields.join('<br>')}`,
      });
      return;
    }

    // Email validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(supplierEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address for the supplier.',
      });
      return;
    }

    // Phone number validation
    if (!supplierPhone.startsWith('0') || supplierPhone.length !== 10 || !/^\d+$/.test(supplierPhone)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Phone number must start with 0 and have exactly 10 digits.',
      });
      return;
    }

    // Convert name to uppercase
    const uppercaseName = name.toUpperCase();
  
    // Proceed with editing inventory
    const data = {
      Name: uppercaseName,
      Location: location,
      Quantity: quantity,
      PurchasedPrice: purchasedPrice,
      SellPrice: sellPrice,
      SupplierName: supplierName,
      SupplierPhone: supplierPhone,
      SupplierEmail: supplierEmail,
    };
  
    setLoading(true);
  
    axios
      .put(`http://localhost:8076/inventory/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Inventory data updated successfully!',
        }).then(() => {
          navigate('/inventory/InventoryDashboard');
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error happened. Please check console.',
        });
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <BackButton destination={`/inventory/InventoryDashboard`} />
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Edit inventory</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Purchased Price</label>
          <input
            type="number"
            value={purchasedPrice}
            onChange={(e) => setPurchasedPrice(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Sell Price</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Supplier Name</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Supplier Phone</label>
          <input
            type="text"
            value={supplierPhone}
            onChange={(e) => {
              const inputPhone = e.target.value;
              if (inputPhone === '' || (inputPhone.length <= 10 && /^\d+$/.test(inputPhone))) {
                setSupplierPhone(inputPhone);
              }
            }}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Supplier Email</label>
          <input
            type="email"
            value={supplierEmail}
            onChange={(e) => setSupplierEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleEditInventory}>
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
    border: '2px solid red',
    borderColor: 'red',
    margin: '10px',
    textAlign: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '20px',
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
  },
  button: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.8s',
  },
};

export default EditInventory;
