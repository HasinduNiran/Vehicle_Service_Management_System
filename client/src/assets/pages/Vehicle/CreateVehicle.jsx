import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import Swal from 'sweetalert2'; // Import SweetAlert2
import BackButton from '../../components/BackButton';
const CreateVehicle = () => {
  //cus id
  const [cusID, setcusId] = useState('');
  const [Register_Number, setRegister_Number] = useState('');
  const [image, setImage] = useState(null);
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

  const validateVehicleNumber = (value) => {
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    if (!value.match(regex)) {
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(Register_Number)) {
      // Display SweetAlert for invalid vehicle number
      Swal.fire({
        icon: 'error',
        title: 'Invalid Vehicle Number',
        text: 'Please enter a valid vehicle number.',
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl = ''; // Initialize imageUrl
      if (image) {
        const storageRef = ref(storage, `vehicleImages/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.error('Error uploading image to Firebase:', error);
            // Even if there's an error uploading image, proceed to create vehicle
            createVehicle(imageUrl);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              imageUrl = downloadURL; // Set imageUrl after successful upload
              createVehicle(imageUrl); // Call createVehicle function with imageUrl
            });
          }
        );
      } else {
        createVehicle(imageUrl); // Call createVehicle function with empty imageUrl
      }
    } catch (error) {
      setLoading(false);
      console.error('Error creating vehicle:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error creating vehicle. Please try again.',
      });
    }
  };

  const createVehicle = (imageUrl) => {
    const data = {
      cusID,
      Register_Number,
      image: imageUrl, // imageUrl will be either empty string or the URL of the uploaded image
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

    axios
      .post('http://localhost:8076/vehicles', data)
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vehicle created successfully.',
          });
          navigate('/vehicle/dashboard');
        } else {
          throw new Error('Failed to create vehicle.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error creating vehicle:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error creating vehicle. Please check validation.',
        });
      });
  };

  return (
    <div style={styles.container}>
      <BackButton destination='/vehicle/dashboard' />
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Create Vehicle</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Remove the 'required' attribute from the input element */}
          <div style={styles.formGroup}>
            <label htmlFor="image" style={styles.label}>
              Vehicle image
            </label>
            <input type="file" id="image" style={styles.input} onChange={handleImageChange} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="register_number" style={styles.label}>Vehicle Number</label>
            <input
              type="text"
              id="register_number"
              style={styles.input}
              value={Register_Number}
              onChange={(e) => setRegister_Number(e.target.value.toUpperCase())}
              maxLength={8}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="register_number" style={styles.label}>User Name </label>
            <input
              type="text"
              id="register_number"
              style={styles.input}
              value={cusID}
              onChange={(e) => setcusId(e.target.value)}
              
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="make" style={styles.label}>Make</label>
          
            <select id="make" style={styles.select} value={Make} onChange={(e) => setMake(e.target.value)}>
              <option value=''>Select Make</option>
              <option value='Car'>Car</option>
              <option value='Van'>Van</option>
              <option value='Bus'>Bus</option>
              <option value='Lorry'>Lorry</option>
            </select>
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
    outline: 'none',
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
