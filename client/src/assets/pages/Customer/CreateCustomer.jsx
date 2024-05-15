import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com'; // Import emailjs-com package
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import backgroundImage from '../../images/t.jpg';

const CreateCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState(null);
  const [cusID, setCusID] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const storage = getStorage(app);

  // Send email function modified to accept email and password as parameters
  const sendEmailToCustomer = (customerEmail, customerPassword) => { 
    const emailConfig = {
        serviceID: 'service_p1zv9rh',
        templateID: 'template_pua7ayd',
        userID: 'v53cNBlrti0pL_RxD'
    };
  
    emailjs.send(
        emailConfig.serviceID,
        emailConfig.templateID,
        {
            to_email: customerEmail,
            message: `Dear customer,\n\nYour account has been successfully created with us.\n\nYour Username is: ${customerEmail}\nYour Password is: ${customerPassword}\n\n\nBest regards,\nNadeeka Auto Service`
        },
        emailConfig.userID
    )
    .then((response) => {
      console.log('Email sent successfully!', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
  };

  const handleSaveCustomer = () => {
    if (!validateInputs()) {
      return;
    }
  
// First name validation
if (!/^[A-Z][a-z]{0,19}$/.test(firstName)) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'First name should start with a capital letter, contain only letters, and have a maximum length of 20 characters.',
  });
  return false;
}
if (!/^[A-Z][a-z]{0,19}$/.test(lastName)) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Last name should start with a capital letter, contain only letters, and have a maximum length of 20 characters.',
  });
  return false;
}


if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Password must contain both lowercase and uppercase letters',
  });
  return false;
}

if (!/[^a-zA-Z0-9]/.test(password)) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Password must contain at least one special character',
  });
  return false;
}

if (phone.length !== 10) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Phone number must have 10 digits',
  });
  return false;
}

  
    setLoading(true);

    // Check if cusID is unique
    const isCusIDUnique = checkCusIDUnique();
    if (!isCusIDUnique) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Customer ID should be unique!',
      });
      setLoading(false);
      return;
    }
  
    // Check if email is unique
    const isEmailUnique = checkEmailUnique();
    if (!isEmailUnique) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email must be unique!',
      });
      setLoading(false);
      return;
    }
  
    const storageRef = ref(storage, `customer_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on('state_changed', 
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            image: downloadURL,
            cusID,
            firstName,
            lastName,
            NIC,
            phone,
            email,
            password,
          };
  
          axios.post('http://localhost:8076/customer', data)
            .then(() => {
              setLoading(false);
              // Show success SweetAlert
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `Customer account created successfully for ${email}. Your Username is: ${cusID} and Password: ${password}`,
                showCancelButton: true,
                confirmButtonText: 'Send Account details to me',
              }).then((result) => {
                if (result.isConfirmed) {
                  sendEmailToCustomer(email, password); // Call sendEmailToCustomer function with the email address and password
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // If user clicks cancel
                }
                // After user acknowledges the success, navigate away
                navigate('/');
              });
            })
            .catch((error) => {
              setLoading(false);
              if (error.response && error.response.data) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'username or email is already in use. It should be unique!',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'An error occurred. Please try again later.',
                });
              }
              console.log(error);
            });
        });
      }
    );
  };

  const validateInputs = () => {
    if (!firstName || !image || !lastName || !NIC || !phone || !email || !password || !cusID || !reEnteredPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address',
      });
      return false;
    }
  
    if (NIC.length < 10 || NIC.length > 12) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'NIC must be between 10 and 12 characters long',
      });
      return false;
    }
  
    if (password.length < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'password must contains at least 10 characters',
      });
      return false;
    }
  
    if (phone.length !== 10) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Phone number must have 10 digits',
      });
      return false;
    }
  
    setError('');
    return true;
  };

  const isValidEmail = (email) => {
    // Basic email validation using regular expression
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkCusIDUnique = () => {
    // Assume an API call to check uniqueness
    // For now, let's just return true to simulate uniqueness
    return true;
  };

  const checkEmailUnique = () => {
    // Assume an API call to check uniqueness
    // For now, let's just return true to simulate uniqueness
    return true;
  };

  return (
    <div style={styles.container}>
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>REGISTER</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={styles.form}>

          {/* Image Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={styles.input}
            />
          </div>

          {/* Customer ID Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={cusID}
              onChange={(e) => setCusID(e.target.value)}
              style={styles.input}
              maxLength={10}
              required={true}
            />
          </div>

          {/* First Name Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Last Name Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* NIC Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>NIC</label>
            <input
              type="text"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              style={styles.input}
              maxLength={12}
            />
          </div>

          {/* Phone Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length === 0 || (inputValue.length > 0 && inputValue[0] === '0')) {
                  setPhone(inputValue);
                } else {
                  // Show SweetAlert error message
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Phone number must start with 0',
                  });
                }
              }}
              style={styles.input}
              maxLength={10}
            />
          </div>

         {/* Email Input */}
         <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

           {/* Password Input */}
           <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>


          {/* Re-enter Password Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Re-enter Password</label>
            <input
              type="password"
              value={reEnteredPassword}
              onChange={(e) => setReEnteredPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Save Button */}
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleSaveCustomer}>
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
    backgroundColor: 'black',
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
};

export default CreateCustomer;
