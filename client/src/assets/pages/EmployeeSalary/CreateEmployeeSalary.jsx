import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/empbg.jpg';

const CreateEmployeeSalary = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [fromDate, setfromDate] = useState('');
  const [toDate, settoDate] = useState('');
  const [totalOThours, settotalOThours] = useState('');
  const [totalOTpay, settotalOTpay] = useState('');
  const [BasicSalary, setBasicSalary] = useState('');
  const [TotalSalary, setTotalSalary] = useState('');

  const [employees, setEmployees] = useState([]);
  const [employeesAttendance, setEmployeesAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [includeEPF, setIncludeEPF] = useState(false); // State to track EPF selection
  const navigate = useNavigate();

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

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/EmployeeAttendence')
      .then((response) => {
        setEmployeesAttendance(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleEmpIDChange = (e) => {
    const selectedEmpID = e.target.value;
    const selectedEmp = employees.find((emp) => emp.EmpID === selectedEmpID);
    setSelectedEmployee({
      ...selectedEmployee,
      EmpID: selectedEmpID,
      employeeName: selectedEmp.employeeName,
    });
    setBasicSalary(selectedEmp.BasicSalary); // Set BasicSalary when EmpID is changed
  };

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
    setBasicSalary(selectedEmp.BasicSalary); // Set BasicSalary when EmployeeName is changed
  };

  // calculate total OT hours
  const calculateTotalOvertimeHours = () => {
    const filteredAttendance = employeesAttendance.filter(
      (attendance) =>
        attendance.EmpID === selectedEmployee.EmpID &&
        attendance.date >= fromDate &&
        attendance.date <= toDate
    );

    const totalOvertimeHours = filteredAttendance.reduce(
      (total, attendance) => total + attendance.OThours,
      0
    );

    // Set the total overtime hours state
    settotalOThours(totalOvertimeHours);
  };

  // Calculate totalOTpay and totalWorkedpay
  const calculatedTotalOTpay = () => {
    const calculatedTotalOTpay = totalOThours * 585;
    settotalOTpay(calculatedTotalOTpay);
  };

  // Calculate totalSalary including EPF if selected
  const calculatedTotalSalary = () => {
    let totalSalary = totalOTpay + parseFloat(BasicSalary); // Convert BasicSalary to float
    if (includeEPF) {
      // Include EPF, 8%
      const epfAmount = totalSalary * 0.08;
      totalSalary -= epfAmount;
    }
    setTotalSalary(totalSalary);
  };

  //validations
  const handleSaveEmployeeSalary = () => {
    if (!selectedEmployee.EmpID || !selectedEmployee.employeeName || !fromDate || !toDate || !BasicSalary) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    if (toDate < fromDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The "toDate" must be after the "fromDate".',
      });
      return;
    }

    if (isNaN(totalOThours)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid numeric value for total OT hours.',
      });
      return;
    }

    const MAX_OHOURS = 48;
    if (totalOThours < 0 || totalOThours > MAX_OHOURS) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Total OT hours must be between 0 and 48 hours.',
      });
      return;
    }

    // Validating fromDate
    const fDate = new Date(fromDate);
    const fcurrentDate = new Date();
    if (fDate > fcurrentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'DOB cannot be a future date.',
      });
      return;
    }

    // Validating toDate
    const tDate = new Date(toDate);
    const tcurrentDate = new Date();
    if (tDate > tcurrentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'DOB cannot be a future date.',
      });
      return;
    }

    calculateTotalOvertimeHours();
    calculatedTotalOTpay();
    calculatedTotalSalary();

    const data = {
      EmpID: selectedEmployee.EmpID,
      employeeName: selectedEmployee.employeeName,
      fromDate,
      toDate,
      totalOThours,
      totalOTpay,
      BasicSalary,
      TotalSalary
    };
    setLoading(true);
    axios
      .post('http://localhost:8076/EmployeeSalary', data)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeSalary/EmpSDashboard');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <BackButton destination='/EmployeeSalary/EmpSDashboard' />
      <h1 style={styles.heading}>Create Employee Salary</h1>
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
            <label style={styles.label}>From Date</label>
            <input
              type='Date'
              value={fromDate}
              onChange={(e) => setfromDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>To Date</label>
            <input
              type='Date'
              value={toDate}
              onChange={(e) => settoDate(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Total OT hours</label>
            <input
              type='text'
              value={totalOThours}
              readOnly
              style={styles.input}
            />
            <button style={styles.button} onClick={calculateTotalOvertimeHours}>
              Calculate Total OT Hours
            </button>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Basic Salary</label>
            <input
              type='text'
              value={BasicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              style={styles.input}
              readOnly
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>EPF</label>
            <button
              style={styles.button}
              onClick={() => setIncludeEPF(!includeEPF)}
            >
              {includeEPF ? 'EPF Included' : 'EPF Excluded'}
            </button>
          </div>
        </div>

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Total OT pay</label>
            <input
              type='text'
              value={totalOTpay}
              readOnly
              style={styles.input}
            />
            <button style={styles.button} onClick={calculatedTotalOTpay}>
              Calculate Total OT Pay
            </button>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Total Salary</label>
            <input
              type='text'
              value={TotalSalary}
              readOnly
              style={styles.input}
            />
            <button style={styles.button} onClick={calculatedTotalSalary}>
              Calculate Total Salary
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button 
        style={{ 
          backgroundColor: 'red', 
          color: '#fff',
          border: 'none',
          borderRadius: '0.25rem',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease', 
        }}
        onClick={handleSaveEmployeeSalary}
      >
        Save
      </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '120vh', // Set height to cover the viewport height
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
  button: {
    //backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default CreateEmployeeSalary;