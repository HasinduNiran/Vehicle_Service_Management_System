// Import necessary dependencies
import React, { useState } from 'react';
 
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


// Define the DeleteMenu component
const DeleteCustomer = () => {
  // State variables for loading state
  const [loading, setLoading] = useState(false);

  // Navigation hook and parameter extraction
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle the menu deletion
  const handleDeleteCustomer = async () => {
    try {
      // Set loading state to true before making the DELETE request
      setLoading(true);

      // Send a DELETE request to the server to delete the Menu by ID
      await axios.delete(`http://localhost:8076/customer/${id}`);

      // If the deletion is successful, update the state and navigate to the home page
      setLoading(false);
      navigate('/customer/allCustomer');
    } catch (error) {
      // If an error occurs, update the state, show an alert, and log the error to the console
      setLoading(false);
      alert('An error occurred. Please check the console.');
      console.error(error);
    }
  };

  // JSX for rendering the DeleteMenu component
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1f2937' }}>

      {/* Heading for the delete menu page */}
      <div style={{ padding: '2rem', maxWidth: '600px', backgroundColor: '#2d3748', borderRadius: '10px', color: '#fff' }}>

      {/* Display a spinner while the delete operation is in progress */}
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Delete Customer</h1>

      {/* Container for the deletion confirmation message and button */}
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Are you sure you want to delete this vehicle?</p>
        {/* Message asking for confirmation */}
        <h3 className='text-2xl'>Are you sure you want to delete this customer?</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        {/* Button to initiate the Menu deletion */}
        <button
           onClick={handleDeleteCustomer}style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.8rem 2rem', borderRadius: '5px', cursor: 'pointer', border: 'none', marginRight: '1rem' }}>
           {loading ? 'Deleting...' : 'Delete'}
        </button>
        <Link to={'/customer/allCustomer'} style={{ backgroundColor: '#007bff', color: 'white', padding: '0.8rem 2rem', borderRadius: '5px', textDecoration: 'none' }}>
            Cancel
          </Link>
      </div>
    </div>
    </div>

  );
};

// Export the DeleteMenu component
export default DeleteCustomer