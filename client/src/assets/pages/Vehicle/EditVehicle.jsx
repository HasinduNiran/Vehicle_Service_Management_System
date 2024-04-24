import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import BackButton from '../../components/BackButton';

const EditVehicle = () => {
  const [Register_Number, setRegister_Number] = useState('');
  const[cusID, setcusID] = useState(''); // Add this line
  const [image, setImage] = useState(null); 
  const [Make, setMake] = useState('');
  const [Model, setModel] = useState('');
  const [Year, setYear] = useState('');
  const [Engine_Details, setEngine_Details] = useState('');
  const [Transmission_Details, setTransmission_Details] = useState('');
  const [Vehicle_Color, setVehicle_Color] = useState('');
  const [Vehicle_Features, setVehicle_Features] = useState('');
  const [Condition_Assessment, setCondition_Assessment] = useState('');
  const [Owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/vehicles/${id}`)
      .then((response) => {
        const data = response.data;
        setRegister_Number(data.Register_Number || '');
        setcusID(data.cusID || '');
        setMake(data.Make || '');
        setModel(data.Model || '');
        setYear(data.Year || '');
        setEngine_Details(data.Engine_Details || '');
        setTransmission_Details(data.Transmission_Details || '');
        setVehicle_Color(data.Vehicle_Color || '');
        setVehicle_Features(data.Vehicle_Features || '');
        setCondition_Assessment(data.Condition_Assessment || '');
        setOwner(data.Owner || '');
        if (data.image) {
          setImage(data.image); // Set the image URL
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching vehicle:', error);
        alert('Error fetching vehicle. Please try again.');
      });
  }, [id]);

// Inside EditVehicle component

const handleImageChange = async (e) => {
  const file = e.target.files[0]; // Access the first file in the array

  // Create a reference to the Firebase Storage bucket
  const storage = getStorage(app);
  const storageRef = ref(storage, `vehicleImages/${file.name}`);

  try {
    // Upload file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Get the download URL of the uploaded file
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Progress tracking
      }, 
      (error) => {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }, 
      async () => {
        // Upload completed successfully, get download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Update the image state with the new image URL
        setImage(downloadURL);
      }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Error uploading image. Please try again.');
  }
};


// Inside return statement

<div style={styles.formGroup}>
  <label htmlFor="image" style={styles.label}>
    Vehicle image
  </label>
  <input type="file" id="image" style={styles.input} onChange={handleImageChange} />
  {/* Conditionally render image preview */}
  {image && (
    <img src={image} alt="Vehicle" style={{ maxWidth: '200px', marginTop: '10px' }} />
  )}
</div>

const handleEditVehicle = async (e) => {
  e.preventDefault();

  const data = {
    image,
    Register_Number,
    Make,
    Model,
    Year,
    Engine_Details,
    Transmission_Details,
    Vehicle_Color,
    Vehicle_Features,
    Condition_Assessment,
    Owner,
    cusID
  };

  setLoading(true);
  try {
    const response = await axios.put(`http://localhost:8076/vehicles/${id}`, data);
    setLoading(false);
    // Check response status
    if (response.status === 200) {
      // Success: Navigate to vehicle list or show success message
      navigate('/vehicle/dashboard');
    } else {
      // Handle other status codes (if needed)
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {
    setLoading(false);
    // Log detailed error message
    console.error('Error updating vehicle:', error);
    // Log response data (if available)
    console.log('Response data:', error.response?.data);
    // Display error message to the user
    alert('Error updating vehicle. Please try again.');
  }
};

// Inside handleImageChange function, update image state
// const handleImageChange = async (e) => {
//   const file = e.target.files[0]; // Access the first file in the array

//   // Create a reference to the Firebase Storage bucket
//   const storage = getStorage(app);
//   const storageRef = ref(storage, `vehicleImages/${file.name}`);

//   try {
//     // Upload file to Firebase Storage
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Get the download URL of the uploaded file
//     uploadTask.on('state_changed', 
//       (snapshot) => {
//         // Progress tracking
//       }, 
//       (error) => {
//         console.error('Error uploading image:', error);
//         alert('Error uploading image. Please try again.');
//       }, 
//       async () => {
//         // Upload completed successfully, get download URL
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//         // Update the image state with the new image URL
//         setImage(downloadURL);
//       }
//     );
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     alert('Error uploading image. Please try again.');
//   }
// };

  


  return (
    <div style={styles.container}>
      <BackButton destination='/vehicle/dashboard' />
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Edit Vehicle</h1>
        <form onSubmit={handleEditVehicle} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="image" style={styles.label}>
              Vehicle image
            </label>
            <input type="file" id="image" style={styles.input} onChange={handleImageChange} />
            {image && (
              <img src={image} alt="Vehicle" style={{ maxWidth: '200px', marginTop: '10px' }} />
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="register_number" style={styles.label}>User Name</label>
            <input
              type="text"
              id="register_number"
              style={styles.input}
              value={cusID}
              onChange={(e) => setcusID(e.target.value)}
             
              required
            />
          </div>
              
          <div style={styles.formGroup}>
            <label htmlFor="register_number" style={styles.label}>Vehicle Number</label>
            <input
              type="text"
              id="register_number"
              style={styles.input}
              value={Register_Number}
              onChange={(e) => setRegister_Number(e.target.value)}
              maxLength={8}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="make" style={styles.label}>Make</label>
            <input
              type="text"
              id="make"
              style={styles.input}
              value={Make}
              onChange={(e) => setMake(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="model" style={styles.label}>Model</label>
            <input
              type="text"
              id="model"
              style={styles.input}
              value={Model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="year" style={styles.label}>Select Year</label>
            <select
              id="year"
              style={styles.input}
              value={Year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              <option value=''>Select Year</option>
              {[...Array(40)].map((_, i) => <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>)}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="engine_details" style={styles.label}>Engine Details</label>
            <input
              type="text"
              id="engine_details"
              style={styles.input}
              value={Engine_Details}
              onChange={(e) => setEngine_Details(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="transmission_details" style={styles.label}>Transmission Details</label>
            <select
              id="transmission_details"
              style={styles.input}
              value={Transmission_Details}
              onChange={(e) => setTransmission_Details(e.target.value)}
              required
            >
              <option value=''>Select Transmission</option>
              <option value='Automatic'>Automatic</option>
              <option value='Manual'>Manual</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="vehicle_color" style={styles.label}>Vehicle Color</label>
            <input
              type="text"
              id="vehicle_color"
              style={styles.input}
              value={Vehicle_Color}
              onChange={(e) => setVehicle_Color(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="vehicle_features" style={styles.label}>Vehicle Features</label>
            <input
              type="text"
              id="vehicle_features"
              style={styles.input}
              value={Vehicle_Features}
              onChange={(e) => setVehicle_Features(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="condition_assessment" style={styles.label}>Condition Assessment</label>
            <input
              type="text"
              id="condition_assessment"
              style={styles.input}
              value={Condition_Assessment}
              onChange={(e) => setCondition_Assessment(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="owner" style={styles.label}>Owner</label>
            <input
              type="text"
              id="owner"
              style={styles.input}
              value={Owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </div>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Editing...' : 'Edit Vehicle'}
            </button>
          </div>
        </form>
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

export default EditVehicle;
