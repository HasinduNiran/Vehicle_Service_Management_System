import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import backgroundImage from '../../images/t.jpg';

const CreateCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState(null);
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const storage = getStorage(app);

  const handleSaveCustomer = () => {
    setLoading(true);

    const storageRef = ref(storage, `images/${image.name}`);
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
            firstName,
            lastName,
            NIC,
            phone,
            email,
            username,
            password,
          };

          axios.post('http://localhost:8076/customer', data)
            .then(() => {
              setLoading(false);
              navigate('/customer/allCustomer');
            })
            .catch((error) => {
              setLoading(false);
              alert(`An error occurred: ${error.response.data.message}`);
              console.log(error);
            });
        });
      }
    );
  };

  return (
    <div style={styles.container}>
     
      {loading ? <Spinner /> : ''}
      
      <div style={styles.formContainer}>
      <h1 style={styles.heading}>REGISTER</h1>
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>NIC</label>
            <input
              type="text"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
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
  select: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: 'black',

      outline: 'none'


  },
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
