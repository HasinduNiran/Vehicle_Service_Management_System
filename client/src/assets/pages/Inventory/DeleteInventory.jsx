// Import necessary dependencies
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import axios from 'axios';

// Define the DeleteMenu component
const DeleteInventory = () => {
  // State variables for loading state
  const [loading, setLoading] = useState(false);

  // Navigation hook and parameter extraction
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle the menu deletion
  const handleDeleteInventory = async () => {
    try {
      // Set loading state to true before making the DELETE request
      setLoading(true);

      // Send a DELETE request to the server to delete the Menu by ID
      await axios.delete(`http://localhost:8076/inventory/${id}`);

      // If the deletion is successful, update the state and navigate to the home page
      setLoading(false);
      navigate('/inventory/InventoryDashboard');
    } catch (error) {
      // If an error occurs, update the state, show an alert, and log the error to the console
      setLoading(false);
      alert('An error occurred. Please check the console.');
      console.error(error);
    }
  };

  // JSX for rendering the DeleteMenu component
  return (
    <div className='p-4'>

      {/* Heading for the delete menu page */}
      <h1 className='text-3xl my-4'>Delete Inventory</h1>

      {/* Display a spinner while the delete operation is in progress */}
      {loading ? <Spinner /> : ''}

      {/* Container for the deletion confirmation message and button */}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        {/* Message asking for confirmation */}
        <h3 className='text-2xl'>Are you sure you want to delete this Inventory item?</h3>

        {/* Button to initiate the Menu deletion */}
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteInventory}
          disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

// Export the DeleteMenu component
export default DeleteInventory