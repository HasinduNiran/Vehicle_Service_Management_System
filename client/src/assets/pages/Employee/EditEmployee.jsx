import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
import backgroundImage from '../../images/t.jpg';
import { useNavigate, useParams } from 'react-router-dom';
//import { useSnackbar } from 'notistack';

const EditEmployee = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [DOB, setDOB] = useState('');
  const [NIC, setNIC] = useState('');
  const [Address, setAddress] = useState('');
  const [BasicSalary, setBasicSalary] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  //const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/employees/${id}`)
    .then((response) => {
        setEmpID(response.data.EmpID);
        setemployeeName(response.data.employeeName)
        setDOB(response.data.DOB)
        setNIC(response.data.NIC);
        setAddress(response.data.Address)
        setBasicSalary(response.data.BasicSalary)
        setContactNo(response.data.ContactNo)
        setEmail(response.data.Email)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditEmployee = () => {

    // Basic validations
    if (!EmpID || !employeeName || !DOB || !NIC || !Address || !BasicSalary || !ContactNo || !Email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields.',
      });
      return;
    }

    // Validating NIC
    if (NIC.length < 10 || NIC.length > 12) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'NIC must be between 10 and 12 characters long',
      });
      return;
    }

    // Validating Contact No
    const contactNoPattern = /^\d{10}$/;
    if (!contactNoPattern.test(ContactNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid Contact No (10 digits).',
      });
      return;
    }

    // Validating Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(Email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid Email.',
      });
      return;
    }

    // Validating DOB
    const dobDate = new Date(DOB);
    const currentDate = new Date();
    if (dobDate > currentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'DOB cannot be a future date.',
      });
      return;
    }

    // Validating employeeName
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(employeeName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Employee Name should only contain letters.',
      });
      return;
    }
    
    const data = {
      EmpID,
      employeeName,
      DOB,
      NIC,
      Address,
      BasicSalary,
      ContactNo,
      Email
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/employees/${id}`, data)
      .then(() => {
        setLoading(false);
        //enqueueSnackbar('Employee Edited successfully', { variant: 'success' });
        navigate('/employees/EmployeeDashboard');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        //enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      
      <BackButton destination='/employees/EmployeeDashboard' />
        <h1 style={styles.heading}>Edit Employee</h1>
        {loading ? <Spinner /> : ''}
        <div style={styles.formContainer}>
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>EmpID</label>
            <input
              type='text'
              value={EmpID}
              onChange={(e) => setEmpID(e.target.value)}
              style={styles.input} 
              readOnly
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Employee Name</label>
            <input
              type='text'
              value={employeeName}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Remove numeric characters from the input value
                const filteredValue = inputValue.replace(/\d/g, '');
                // Update the state with the filtered value
                setemployeeName(filteredValue)}}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>DOB</label>
            <input
              type='Date'
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>NIC</label>
            <input
              type='text'
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              style={styles.input}
            />
          </div>
          </div>
          <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <input
              type='text'
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>BasicSalary</label>
            <input
              type='number'
              value={BasicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Contact No</label>
            <input
              type='number'
              value={ContactNo}
              onChange={(e) => setContactNo(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type='text'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          </div>
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleEditEmployee}>
              Save
            </button>
          
        
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
    flexDirection: 'column',
    justifyContent: 'center',
    
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundBasicSalary: 'center',
    height: '117vh', // Set height to cover the viewport height
},
formContainer: {
  display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    border: '2px solid red', // Add a red border
    borderColor: 'red',
    margin: '10px auto',
    textAlign: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    padding: '20px',
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
  width: '50%',
  
  padding: '20px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '10px',
  margin: ' auto',
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
  backgroundColor: '#1B1B1B',
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

export default EditEmployee