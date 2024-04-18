import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteEmployeeAttendence = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteEmployeeAttendence = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8076/EmployeeAttendence/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeAttendence/EmpADashboard');
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error deleting employee attendance:', error);
      });
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1f2937' }}>
      <div style={{ padding: '2rem', maxWidth: '600px', backgroundColor: '#2d3748', borderRadius: '10px', color: '#fff' }}>
        <BackButton destination='/EmployeeAttendence/EmpADashboard' /> 
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Delete Employee Attendance</h1>
        {loading && <Spinner />}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Are You Sure You want to delete this Employee Attendance?</h3>
          <button
            style={{ backgroundColor: '#dc3545', color: 'white', padding: '1rem 2rem', borderRadius: '5px', cursor: 'pointer', border: 'none', marginBottom: '1rem' }}
            onClick={handleDeleteEmployeeAttendence}
          >
            {loading ? 'Deleting...' : 'Yes, Delete it'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeAttendence;
