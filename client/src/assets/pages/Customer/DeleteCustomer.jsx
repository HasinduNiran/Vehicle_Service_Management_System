import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const DeleteCustomer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteCustomer = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8076/customer/${id}`);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert('An error occurred while deleting the customer. Please check the console.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1f2937' }}>
      <div style={{ padding: '2rem', maxWidth: '600px', backgroundColor: '#2d3748', borderRadius: '10px', color: '#fff' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Delete Customer</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Are you sure you want to delete this customer?</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={handleDeleteCustomer}
            style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.8rem 2rem', borderRadius: '5px', cursor: 'pointer', border: 'none', marginRight: '1rem' }}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <Link
            to={'/customer/customerDashboard'}
            style={{ backgroundColor: '#007bff', color: 'white', padding: '0.8rem 2rem', borderRadius: '5px', textDecoration: 'none' }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomer;
