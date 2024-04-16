import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';

const CreateVehicle = () => {
  const [Register_Number, setRegister_Number] = useState('');
  const [image, setImage] = useState(null); // Modified to store image file instead of image URL
  const [Make, setMake] = useState('');
  const [Model, setModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [Engine_Details, setEngine_Details] = useState('');
  const [Transmission_Details, setTransmission_Details] = useState('');
  const [Vehicle_Color, setVehicle_Color] = useState('');
  const [Vehicle_Features, setVehicle_Features] = useState('');
  const [Condition_Assessment, setCondition_Assessment] = useState('');
  const [Owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const storage = getStorage(app);

  // Validation function for Vehicle Number
  const validateVehicleNumber = (value) => {
    // Regular expression for alphanumeric with hyphen and space
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    // Check if the value matches the pattern
    if (!value.match(regex)) {
      return false; // Return false if validation fails
    }
    return true; // Return true if validation passes
  };

  const handleImageChange = (e) => {
    // Update the image state with the selected file
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!validateVehicleNumber(Register_Number)) {
      alert('Please enter a valid vehicle number.'); // Display an error message if validation fails
      return; // Exit the function if validation fails
    }

    setLoading(true);
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress monitoring can be added here if needed
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Error uploading image to Firebase:', error);
          setLoading(false);
          alert('Error uploading image to Firebase. Please try again.');
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Once image is uploaded, proceed to submit form data to backend
            const data = {
              Register_Number,
              image: downloadURL, // Update image field with the download URL from Firebase Storage
              Make,
              Model,
              Year: selectedYear,
              Engine_Details,
              Transmission_Details,
              Vehicle_Color,
              Vehicle_Features,
              Condition_Assessment,
              Owner,
            };

            // Submit form data to backend
            axios.post('http://localhost:8076/vehicles', data).then((response) => {
              setLoading(false);
              if (response.status === 201) {
                alert('Vehicle created successfully.'); // Show success message
                navigate('/vehicle'); // Navigate to the vehicle page after successful creation
              } else {
                throw new Error('Failed to create vehicle.'); // Throw error if response status is not 201
              }
            });
          });
        }
      );
    } catch (error) {
      setLoading(false);
      console.error('Error creating vehicle:', error);
      alert('Error creating vehicle. Please try again.'); // Display a generic error message
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Create Vehicle</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="image" style={styles.label}>
              Vehicle image
            </label>
            <input type="file" id="image" style={styles.input} onChange={handleImageChange} required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="register_number" style={styles.label}>Vehicle Number</label>
            <input type="text" id="register_number" style={styles.input} value={Register_Number} onChange={(e) => setRegister_Number(e.target.value)} maxLength={8} required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="make" style={styles.label}>Make</label>
            <input type="text" id="make" style={styles.input} value={Make} onChange={(e) => setMake(e.target.value)} required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="model" style={styles.label}>Model</label>
            <input type="text" id="model" style={styles.input} value={Model} onChange={(e) => setModel(e.target.value)} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Year</label>
            <select style={styles.select} value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value=''>Select Year</option>
              {[...Array(40)].map((_, index) => {
                const year = new Date().getFullYear() - index;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="engine_details" style={styles.label}>Engine Details</label>
            <input type="text" id="engine_details" style={styles.input} value={Engine_Details} onChange={(e) => setEngine_Details(e.target.value)} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="transmission_details" style={styles.label}>Transmission Details</label>
            <select id="transmission_details" style={styles.select} value={Transmission_Details} onChange={(e) => setTransmission_Details(e.target.value)}>
              <option value=''>Select Transmission</option>
              <option value='Automatic'>Automatic</option>
              <option value='Manual'>Manual</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="vehicle_color" style={styles.label}>Vehicle Color</label>
            <input type="text" id="vehicle_color" style={styles.input} value={Vehicle_Color} onChange={(e) => setVehicle_Color(e.target.value)} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="vehicle_features" style={styles.label}>Vehicle Features</label>
            <input type="text" id="vehicle_features" style={styles.input} value={Vehicle_Features} onChange={(e) => setVehicle_Features(e.target.value)} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="condition_assessment" style={styles.label}>Condition Assessment</label>
            <input type="text" id="condition_assessment" style={styles.input} value={Condition_Assessment} onChange={(e) => setCondition_Assessment(e.target.value)} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="owner" style={styles.label}>Vehicle Owner</label>
            <input type="text" id="owner" style={styles.input} value={Owner} onChange={(e) => setOwner(e.target.value)} />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Creating...' : 'Create Vehicle'}
            </button>
          </div>
        </form>
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

export default CreateVehicle;
