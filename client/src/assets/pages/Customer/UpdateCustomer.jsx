import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { app } from '../../../firebase';
import backgroundImage from '../../images/t.jpg';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';

const UpdateCustomer = () => {
  const [customer, setCustomer] = useState({
    cusID: '',
    firstName: '',
    lastName: '',
    NIC: '',
    phone: '',
    email: '',
    password: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const storage = getStorage(app);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/customer/${id}`)
      .then((response) => {
        const data = response.data;
        setCustomer(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again later.',
        });
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Add validations for phone number, email, and password
    if (name === 'phone' && (!/^\d{0,10}$/.test(value) || value.charAt(0) !== '0')) return;
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) return;
    if (name === 'password' && value.length < 10) return;
    if (name === 'NIC' && value.length > 12) return;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      setCustomer(prevState => ({
        ...prevState,
        image: imageFile,
      }));
    }
  };

  const handleUpdateCustomer = async () => {
    setLoading(true);

    try {
      let imageUrl = customer.image; // Default to the current image URL
      if (customer.image && customer.image instanceof File) {
        const storageRef = ref(storage, `customer_images/${id}`);
        const uploadTask = uploadBytesResumable(storageRef, customer.image);

        await uploadTask;

        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }

      // Update customer data with image URL
      const updatedCustomer = { ...customer, image: imageUrl };

      // Make the PUT request to update the customer
      axios.put(`http://localhost:8076/customer/${id}`, updatedCustomer)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            navigate(`/customer/get/${id}`);
          } else {
            console.error('Unexpected response status:', response.status);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unexpected response status. Please try again later.',
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error updating customer:', error);
          console.log('Response data:', error.response?.data);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while updating the customer. Please try again later.',
          });
        });
    } catch (error) {
      setLoading(false);
      console.error('Error updating customer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while updating the customer. Please try again later.',
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>EDIT PROFILE</h1>

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              style={styles.input}
            />
            {customer.image && <img src={customer.image instanceof File ? URL.createObjectURL(customer.image) : customer.image} alt="Customer" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Customer ID</label>
            <input
              type="text"
              name="cusID"
              value={customer.cusID}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={customer.firstName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={customer.lastName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>NIC</label>
            <input
              type="text"
              name="NIC"
              value={customer.NIC}
              onChange={handleChange}
              style={styles.input}
              maxLength={12} // Limit NIC to 12 characters
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="text"
              name="email"
              value={customer.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={customer.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleUpdateCustomer}>
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
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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

export default UpdateCustomer;
