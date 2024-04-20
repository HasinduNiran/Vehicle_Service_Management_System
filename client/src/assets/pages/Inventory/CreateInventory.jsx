import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import backgroundImage from '../../images/t.jpg'; // Make sure to import your background image

const CreateInventory = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasedPrice, setPurchasedPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }

    if (!quantity.trim()) {
      errors.quantity = 'Quantity is required';
      isValid = false;
    } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
      errors.quantity = 'Quantity must be a positive number';
      isValid = false;
    }

    if (!purchasedPrice.trim()) {
      errors.purchasedPrice = 'Purchased Price is required';
      isValid = false;
    } else if (isNaN(purchasedPrice) || parseFloat(purchasedPrice) <= 0) {
      errors.purchasedPrice = 'Purchased Price must be a positive number';
      isValid = false;
    }

    if (!sellPrice.trim()) {
      errors.sellPrice = 'Sell Price is required';
      isValid = false;
    } else if (isNaN(sellPrice) || parseFloat(sellPrice) <= 0) {
      errors.sellPrice = 'Sell Price must be a positive number';
      isValid = false;
    }

    if (!supplierName.trim()) {
      errors.supplierName = 'Supplier Name is required';
      isValid = false;
    }

    if (!supplierPhone.trim()) {
      errors.supplierPhone = 'Supplier Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(supplierPhone)) {
      errors.supplierPhone = 'Supplier Phone must be a 10-digit number';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const checkInventoryItem = async () => {
    try {
      const response = await axios.get(`http://localhost:8076/inventory?Name=${name}`);
      return response.data.length == name.length ;
    } catch (error) {
      console.error('Error checking inventory:', error);
      return false;
    }
  };

  const handleSaveInventory = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const itemExists = await checkInventoryItem();

    if (itemExists) {
      Swal.fire({
        icon: 'error',
        title: 'Item already exists in the inventory',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      setLoading(false);
      return;
    }

    const data = {
      Name: name,
      Location: location,
      Quantity: quantity,
      PurchasedPrice: purchasedPrice,
      SellPrice: sellPrice,
      SupplierName: supplierName,
      SupplierPhone: supplierPhone,
    };

    axios
      .post('http://localhost:8076/inventory', data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Inventory item created successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        setTimeout(() => {
          setLoading(false);
          navigate('/inventory/InventoryDashboard');
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
      <h1 style={styles.heading}>Add Inventory</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />
          {errors.location && <p style={styles.error}>{errors.location}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
          />
          {errors.quantity && <p style={styles.error}>{errors.quantity}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Purchased Price</label>
          <input
            type="number"
            value={purchasedPrice}
            onChange={(e) => setPurchasedPrice(e.target.value)}
            style={styles.input}
          />
          {errors.purchasedPrice && <p style={styles.error}>{errors.purchasedPrice}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Sell Price</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            style={styles.input}
          />
          {errors.sellPrice && <p style={styles.error}>{errors.sellPrice}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Supplier Name</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            style={styles.input}
          />
          {errors.supplierName && <p style={styles.error}>{errors.supplierName}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Supplier Phone</label>
          <input
            type="text"
            value={supplierPhone}
            onChange={(e) => setSupplierPhone(e.target.value)}
            style={styles.input}
          />
          {errors.supplierPhone && <p style={styles.error}>{errors.supplierPhone}</p>}
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleSaveInventory}>
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
    margin: '10px',
    textAlign: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: 'red',
    textTransform: 'uppercase',
    backgroundColor: 'black',
    display: 'block',
    padding: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.2rem',
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
  error: {
    color: 'red',
    textAlign: 'left',
    marginTop: '0.5rem',
  },
};

export default CreateInventory;
