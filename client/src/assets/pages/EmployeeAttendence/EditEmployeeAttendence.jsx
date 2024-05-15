import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
import backgroundImage from '../../images/empbg.jpg';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeeAttendence = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [date, setdate] = useState('');
  const [InTime, setInTime] = useState('');
  const [OutTime, setOutTime] = useState('');
  const [WorkingHours, setWorkingHours] = useState('');
  const [OThours, setOThours] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/EmployeeAttendence/${id}`)
    .then((response) => {
        setEmpID(response.data.EmpID);
        setemployeeName(response.data.employeeName)
        setdate(response.data.date)
        setInTime(response.data.InTime);
        setOutTime(response.data.OutTime)
        setWorkingHours(response.data.WorkingHours)
        setOThours(response.data.OThours)
        
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])
  
  const handleEditEmployeeAttendence = () => {

    // Basic validations
    if (!EmpID || !employeeName || !date) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in fields Emp ID,Employee Name,Date.',
      });
      return;
    }

    // Validating DOB
    const Ddate = new Date(date);
    const currentDate = new Date();
    if (Ddate > currentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'date cannot be a future date.',
      });
      return;
    }

    const data = {
      EmpID,
      employeeName,
      date,
      InTime,
      OutTime,
      WorkingHours,
      OThours
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/EmployeeAttendence/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeAttendence/EmpADashboard');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
    calculateHoursWorked(e.target.value, OutTime);
  };

  const handleOutTimeChange = (e) => {
    setOutTime(e.target.value);
    calculateHoursWorked(InTime, e.target.value);
  };

  const calculateHoursWorked = (inTime, outTime) => {
    const inTimeParts = inTime.split(':');
    const outTimeParts = outTime.split(':');

    const inTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(inTimeParts[0]),
      parseInt(inTimeParts[1]),
      0
    );
    const outTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(outTimeParts[0]),
      parseInt(outTimeParts[1]),
      0
    );

    if (isNaN(inTimeDate.getTime()) || isNaN(outTimeDate.getTime())) {
      console.error('Invalid input time format');
      return;
    }

    const timeDiff = outTimeDate - inTimeDate;
    const hoursWorked = timeDiff / (1000 * 60 * 60);
    const normalWorkingHours = 8;

    if (hoursWorked > normalWorkingHours) {
      const overtimeHours = hoursWorked - normalWorkingHours;
      setOThours(overtimeHours.toFixed(2));
      setWorkingHours(normalWorkingHours.toFixed(2));
    } else {
      setOThours('0.00');
      setWorkingHours(hoursWorked.toFixed(2));
    }
  };

  const handleRecordInTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newInTime = `${hours}:${minutes}`;
    setInTime(newInTime);
    calculateHoursWorked(newInTime, OutTime);
  };
  
  const handleRecordOutTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newOutTime = `${hours}:${minutes}`;
    setOutTime(newOutTime);
    calculateHoursWorked(InTime, newOutTime);
  };

  return (
    <div style={styles.container}>
      <BackButton destination='/EmployeeAttendence/EmpADashboard' /> 
      <h1 style={styles.heading}>Edit Employee Attendance</h1>
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
              onChange={(e) => setemployeeName(e.target.value)}
              style={styles.input}
              readOnly
            />
          </div>
  
          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setdate(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
  
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>InTime</label>
            <input
              type='time'
              value={InTime}
              onChange={handleInTimeChange}
              style={styles.input}
            />
            <button
              onClick={handleRecordInTime}
              style={styles.timeButton}
            >
              Record Current Time
            </button>
          </div>
  
          <div style={styles.formGroup}>
            <label style={styles.label}>OutTime</label>
            <input
              type='time'
              value={OutTime}
              onChange={handleOutTimeChange}
              style={styles.input}
            />
            <button
              onClick={handleRecordOutTime}
              style={styles.timeButton}
            >
              Record Current Time
            </button>
          </div>
        </div>
  
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Working Hours</label>
            <input
              type='text'
              value={WorkingHours}
              readOnly
              style={styles.input}
            />
          </div>
  
          <div style={styles.formGroup}>
            <label style={styles.label}>Overtime Hours</label>
            <input
              type='text'
              value={OThours}
              readOnly
              style={styles.input}
            />
          </div>
        </div>
  
      </div>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={handleEditEmployeeAttendence}
        >
          Save
        </button>
      </div>
    </div>
  );
}

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
      backgroundPosition: 'center',
      height: '100vh', // Set height to cover the viewport height
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
  width: '30%',
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

export default EditEmployeeAttendence;
