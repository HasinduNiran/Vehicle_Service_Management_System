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
  const [supplierEmail, setSupplierEmail] = useState('');
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
    } else if (parseFloat(sellPrice) < parseFloat(purchasedPrice)) {
      errors.sellPrice = 'Sell Price must be equal to or greater than Purchased Price';
      isValid = false;
    }

    if (!supplierName.trim()) {
      errors.supplierName = 'Supplier Name is required';
      isValid = false;
    }

    if (!supplierPhone.trim()) {
      errors.supplierPhone = 'Supplier Phone is required';
      isValid = false;
    } else if (!/^0\d{9}$/.test(supplierPhone)) { // Change regex pattern to match phone number starting with 0
      errors.supplierPhone = 'Supplier Phone must start with 0 and be a 10-digit number';
      isValid = false;
    }

    if (!supplierEmail.trim()) {
      errors.supplierEmail = 'Supplier email is required';
      isValid = false;
    }

    if (!isValid) {
      // Display SweetAlert for errors
      Swal.fire({
        icon: 'error',
        title: 'Problem with Inventory creation',
        html: Object.values(errors).map(error => `<p>${error}</p>`).join(''),
      });
    }

    setErrors(errors);
    return isValid;
  };

  const checkInventoryItem = async (itemNameUpperCase) => {
    try {
      const response = await axios.get(`http://localhost:8076/inventory?Name=${itemNameUpperCase}`);
      return response.data.length > 0;
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
    const itemNameUpperCase = name.toUpperCase(); // Convert item name to uppercase

    const itemExists = await checkInventoryItem(itemNameUpperCase); // Pass the uppercase name to check for duplicates

    if (itemExists) {
      // Display SweetAlert for existing item
      Swal.fire({
        icon: 'error',
        title: 'Inventory item with the same name already exists',
        text: 'Please choose a different name or update the existing item',
      });
      setLoading(false); // Set loading to false
      return;
    }

    const data = {
      Name: itemNameUpperCase, // Save item name in uppercase
      Location: location,
      Quantity: quantity,
      PurchasedPrice: purchasedPrice,
      SellPrice: sellPrice,
      SupplierName: supplierName,
      SupplierPhone: supplierPhone,
      SupplierEmail: supplierEmail,
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
        //alert('An error happened. Please check console');
        Swal.fire({
          icon: 'error',
          title: 'Inventory item already exists',
          text: 'Please check the item name or update the existing item',
        });
        console.error(error);
      });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10); // Remove non-digit characters and limit to 10 digits
    setSupplierPhone(value);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setSupplierEmail(email);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, supplierEmail: 'Please enter a valid email address' });
    } else {
      setErrors({ ...errors, supplierEmail: '' });
    }
  };


  return (
    <div style={styles.container}>
      {/* Loading spinner */}
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
        {/* Form heading */}
        <h1 style={styles.heading}>Add Inventory</h1>
        {/* Name input field */}
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
        {/* Location input field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          >
            <option value="Vault">Vault</option>
            <option value="Carton\Shelf">Carton\Shelf</option>
            <option value="Drawer">Drawer</option>
            <option value="Box">Box</option>
            <option value="Cabinet">Cabinet</option>
            <option value="Locker">Locker</option>
            <option value="Tray">Tray</option>
            <option value="Rack">Rack</option>
            <option value="Bin">Bin</option>
            <option value="Compartment">Compartment</option>
            <option value="Container">Container</option>
            <option value="barrel">Barrel set</option>
            {/* Add more options as needed */}
          </select>
          {errors.location && <p style={styles.error}>{errors.location}</p>}
        </div>
        {/* Quantity input field */}
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
        {/* Purchased Price input field */}
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
        {/* Sell Price input field */}
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
        {/* Supplier Name input field */}
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
        {/* Supplier Phone input field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Supplier Phone</label>
          <input
            type="text"
            value={supplierPhone}
            onChange={handlePhoneChange}
            style={styles.input}
          />
          {errors.supplierPhone && <p style={styles.error}>{errors.supplierPhone}</p>}
        </div>
        {/* Supplier Email input field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Supplier Email</label>
          <input
            type="email"
            value={supplierEmail}
            onChange={handleEmailChange}
            style={styles.input}
          />
          {errors.supplierEmail && <p style={styles.error}>{errors.supplierEmail}</p>}
        </div>

        {/* Save button */}
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
