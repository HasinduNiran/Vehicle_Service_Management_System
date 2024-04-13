import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from './t.jpg';


const EditVehicle = () => {
  const [Register_Number, setRegister_Number] = useState('');
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
        setRegister_Number(data.Register_Number);
        setMake(data.Make);
        setModel(data.Model);
        setYear(data.Year);
        setEngine_Details(data.Engine_Details);
        setTransmission_Details(data.Transmission_Details);
        setVehicle_Color(data.Vehicle_Color);
        setVehicle_Features(data.Vehicle_Features);
        setCondition_Assessment(data.Condition_Assessment);
        setOwner(data.Owner);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert('Error fetching vehicle. Please try again.');
      });
  }, [id]);

  const handleEditVehicle = async (e) => {
    e.preventDefault();

    // Perform validation here if needed

    const data = {
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
    };

    setLoading(true);
    try {
      await axios.put(`http://localhost:8076/vehicles/${id}`, data);
      setLoading(false);
      navigate('/vehicle');
    } catch (error) {
      setLoading(false);
      console.error('Error updating vehicle:', error);
      alert('Error updating vehicle. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Edit Vehicle</h1>
        <form onSubmit={handleEditVehicle} style={styles.form}>
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
            <label htmlFor="owner" style={styles.label}>Vehicle Owner</label>
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
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    padding: '20px',
    bordercolor: 'red',
    margin: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    padding: '20px',
    bordercolor: 'red',
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
    marginBottom: '20px',
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
