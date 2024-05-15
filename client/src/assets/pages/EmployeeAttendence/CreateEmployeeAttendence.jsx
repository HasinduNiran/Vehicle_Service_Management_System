import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
import backgroundImage from '../../images/empbg.jpg';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeAttendence = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [InTime, setInTime] = useState('');
  const [OutTime, setOutTime] = useState('');
  const [WorkingHours, setWorkingHours] = useState('');
  const [OThours, setOThours] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // State to hold selected employee
  const [selectedEmployee, setSelectedEmployee] = useState({
    EmpID: '',
    employeeName: ''
  });

  
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/employees')
      .then((response) => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Handler to update selected employee based on EmpID change
  const handleEmpIDChange = (e) => {
    const selectedEmpID = e.target.value;
    const selectedEmp = employees.find((emp) => emp.EmpID === selectedEmpID);
    setSelectedEmployee({
      ...selectedEmployee,
      EmpID: selectedEmpID,
      employeeName: selectedEmp.employeeName,
    });
  };

  // Handler to update selected employee based on employee name change
  const handleEmployeeNameChange = (e) => {
    const selectedEmployeeName = e.target.value;
    const selectedEmp = employees.find(
      (emp) => emp.employeeName === selectedEmployeeName
    );
    setSelectedEmployee({
      ...selectedEmployee,
      EmpID: selectedEmp.EmpID,
      employeeName: selectedEmployeeName,
    });
  };

  // Handler to update InTime and calculate working hours
  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
    calculateHoursWorked(e.target.value, OutTime); // Call calculateHoursWorked
  };

  // Handler to update OutTime and calculate working hours
  const handleOutTimeChange = (e) => {
    setOutTime(e.target.value);
    calculateHoursWorked(InTime, e.target.value); // Call calculateHoursWorked
  };

  // Function to calculate working hours and overtime
  const calculateHoursWorked = (inTime, outTime) => {
    // Parsing time strings to Date objects
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

    // Check if time inputs are valid
    if (isNaN(inTimeDate.getTime()) || isNaN(outTimeDate.getTime())) {
      console.error('Invalid input time format');
      return;
    }

    // Calculate time difference
    const timeDiff = outTimeDate - inTimeDate;
    const hoursWorked = timeDiff / (1000 * 60 * 60);
    const normalWorkingHours = 8;

    // Update working hours and overtime hours based on hours worked
    if (hoursWorked > normalWorkingHours) {
      const overtimeHours = hoursWorked - normalWorkingHours;
      setOThours(overtimeHours.toFixed(2));
      setWorkingHours(normalWorkingHours.toFixed(2));
    } else {
      setOThours('0.00');
      setWorkingHours(hoursWorked.toFixed(2));
    }
  };

  // Handler to save employee attendance
  const handleSaveEmployeeAttendence = () => {

    // Basic validations
    if (!selectedEmployee.EmpID || !selectedEmployee.employeeName || !selectedDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in fields Emp ID,Employee Name,Date.',
      });
      return;
    }

    const data = {
      EmpID: selectedEmployee.EmpID,
      employeeName: selectedEmployee.employeeName,
      date: selectedDate,
      InTime,
      OutTime,
      WorkingHours,
      OThours,
    };
    setLoading(true);
    axios
      .post('http://localhost:8076/EmployeeAttendence', data)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeAttendence/EmpADashboard');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // Handler to record current time as InTime
  const handleRecordInTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newInTime = `${hours}:${minutes}`;
    setInTime(newInTime);
    calculateHoursWorked(newInTime, OutTime); // Recalculate hours worked
  };
  
  // Handler to record current time as OutTime
  const handleRecordOutTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newOutTime = `${hours}:${minutes}`;
    setOutTime(newOutTime);
    calculateHoursWorked(InTime, newOutTime); // Recalculate hours worked
  };
  

  return (
    <div style={styles.container}>
      <BackButton destination='/EmployeeAttendence/EmpADashboard' />
      <h1 style={styles.heading}>Create Employee Attendance</h1>
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>EmpID</label>
            <select
              value={selectedEmployee.EmpID}
              onChange={handleEmpIDChange}
              style={styles.input}
            >
              <option value=''>Select EmpID</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.EmpID}>
                  {employee.EmpID}
                </option>
              ))}
            </select>
          </div>
  
          <div style={styles.formGroup}>
            <label style={styles.label}>Employee Name</label>
            <select
              value={selectedEmployee.employeeName}
              onChange={handleEmployeeNameChange}
              style={styles.input}
            >
              <option value=''>Select Employee Name</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.employeeName}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>
  
          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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
          onClick={handleSaveEmployeeAttendence}
        >
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

export default CreateEmployeeAttendence;
