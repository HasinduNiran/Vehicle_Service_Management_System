
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneCustomer = () => {
  // State for menu item, loading indicator, and extracting 'id' from route parameters
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Fetch menu item from the server based on the provided 'id' on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/customer/${id}`)
      .then((response) => {
        setCustomer(response.data);
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
      <h1 className='text-3xl my-4'>Show Customer</h1>

      {/* Display loading spinner or menu details */}
      {loading ? (
        <Spinner />
      ) : (
        // Display menu details in a styled container
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          {/* Individual menu item details */}
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Customer Number</span>
            <span>{customer._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>First Name</span>
            <span>{customer.firstName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Name</span>
            <span>{customer.lastName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>NIC</span>
            <span>{customer.NIC}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Phone</span>
            <span>{customer.phone}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email</span>
            <span>{customer.email}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Username</span>
            <span>{customer.Username}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Password</span>
            <span>{customer.password}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(customer.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(customer.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneCustomer 