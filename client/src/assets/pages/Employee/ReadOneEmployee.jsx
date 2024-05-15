import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import backgroundImage from '../../images/empbg.jpg';

const ReadOneEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <BackButton destination='/employees/EmployeeDashboard' /> 
      <h1 style={styles.heading}>Show Employee</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.employeeContainer}>
          <div style={styles.employeeInfo}>
            <div style={styles.employeeField}>
              <span style={styles.label}>Emp ID:</span>
              <span style={styles.value}>{employee.EmpID}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Employee Name:</span>
              <span style={styles.value}>{employee.employeeName}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>DOB:</span>
              <span style={styles.value}>{employee.DOB}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>NIC:</span>
              <span style={styles.value}>{employee.NIC}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Address:</span>
              <span style={styles.value}>{employee.Address}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Basic Salary:</span>
              <span style={styles.value}>{employee.BasicSalary}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Contact No:</span>
              <span style={styles.value}>{employee.ContactNo}</span>
            </div>
            <div style={styles.employeeField}>
              <span style={styles.label}>Email:</span> 
              <span style={styles.value}>{employee.Email}</span>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundBasicSalary: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '3rem',
    marginBottom: '30px',
    color: '#fff',
  },
  employeeContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 4, 0.6)',
    borderRadius: '10px',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    padding: '20px',
    border: '2px solid red',
    textAlign: 'left',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh', 
  },
  employeeInfo: {
    margin: '0 auto',
    padding: '10px',
    width: '80%',
  },
  employeeField: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: 'red',
    width: '100%',
    padding: '1px',
    textTransform: 'uppercase',
  },
  value: {
    width : '100%',
    color: 'white',
  },
};

export default ReadOneEmployee;
