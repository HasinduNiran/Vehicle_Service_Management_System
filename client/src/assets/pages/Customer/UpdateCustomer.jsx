// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import Spinner from "../../components/Spinner"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for EditMenu
const EditCustomer = () => {
  // State variables for managing form data and loading state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/customer/${id}`)
      .then((response) => {
        const data = response.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setNIC(data.NIC);
        setPhone(data.phone);
        setEmail(data.email);
        setUsername(data.Username);
        setPassword(data.password);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`An error happened. Please check console`);
        console.log(error);
      });
  }, [id]);

  // Event handler for editing the menu
  const handleEditCustomer = () => {
    // Creating data object from form inputs
    const data = {
      firstName,
      lastName,
      NIC,
      phone,
      email,
      Username,
      password,
    };

    setLoading(true);

    // Making a PUT request to edit the menu data
    axios
      .put(`http://localhost:8076/customer/${id}`, data)
      .then(() => {
        // Resetting loading state and navigating to the home page
        setLoading(false);
        navigate('/customer/allCustomer');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the edit menu form
  return (
    <div className="p-4">
    
    <h1 className="text-3xl my-4">Create menu</h1>
    {loading ? <Spinner /> : ''}
    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'>NIC</label>
        <input
          type="text"
          value={NIC}
          onChange={(e) => setNIC(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'> Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'>Username</label>
        <input
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'>Password</label>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditCustomer}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditMenu component
export default EditCustomer;
