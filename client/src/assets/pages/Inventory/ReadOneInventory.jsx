import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneInventory = () => {
  // State for menu item, loading indicator, and extracting 'id' from route parameters
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Fetch menu item from the server based on the provided 'id' on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/inventory/${id}`)
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // Include 'id' in the dependency array to re-fetch data when 'id' changes

  return (
    <div className='p-4'>
      {/* Header */}
      <h1 className='text-3xl my-4'>Show Inventory</h1>

      {/* Display loading spinner or menu details */}
      {loading ? (
        <Spinner />
      ) : (
        // Display menu details in a styled container
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          {/* Individual menu item details */}
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Item Number</span>
            <span>{inventory._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{inventory.Name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Location</span>
            <span>{inventory.Location}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Quantity</span>
            <span>{inventory.Quantity}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Purchased Price</span>
            <span>{inventory.PurchasedPrice}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Sell Price</span>
            <span>{inventory.SellPrice}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Supplier Name</span>
            <span>{inventory.SupplierName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Supplier Phone</span>
            <span>{inventory.SupplierPhone}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(inventory.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(inventory.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneInventory