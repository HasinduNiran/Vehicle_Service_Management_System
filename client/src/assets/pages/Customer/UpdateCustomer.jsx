import { useState, useEffect } from "react";
import React from 'react';
import Spinner from "../../components/Spinner"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for EditCustomer
const EditCustomer = () => {
  // State variables for managing form data and loading state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
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
        setUsername(data.username);
        setPassword(data.password);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`An error happened. Please check console`);
        console.log(error);
      });
  }, [id]);

  // // Function to generate cusID like CUS1, CUS2, CUS3...
  // const generateCusID = () => {
  //   const index = Math.floor(Math.random() * 100) + 1; // Generate a random index
  //   return `CUS${index}`;
  // };

  // Event handler for editing the customer
  const handleEditCustomer = () => {
    // Creating data object from form inputs
    const data = {
      firstName,
      lastName,
      NIC,
      phone,
      email,
      username,
      password,
    };

    setLoading(true);

    // Making a PUT request to edit the customer data
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

  // JSX for rendering the edit customer form
  return (
    <div className="p-4">


      <h1 className="text-3xl my-4">Create menu</h1>

      <h1 className="text-3xl my-4">Edit Customer</h1>

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

            value={username}

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

      <div className="col-lg-4 col-md-6 price-main-info mt-md-0 mt-4">
        <div className="price-inner card box-shadow active">
          <div className="card-body">
            <label className="price-label">Recommended</label>
            <h4 className="text-uppercase text-center mb-3">Platinum Package</h4>
            <h5 className="card-title pricing-card-title">
              <span className="align-top">$</span>69
            </h5>
            <ul className="list-unstyled mt-3 mb-4">
              <li> <span className="fa fa-check"></span> Conventional Oil Change</li>
              <li> <span className="fa fa-check"></span> Fuel System Cleaning</li>
              <li> <span className="fa fa-check"></span> Coolant Exchange</li>
              <li> <span className="fa fa-check"></span> Transmission Fluid Service</li>
              <li> <span className="fa fa-check"></span> Visual Brake Inspection</li>
              <li> <span className="fa fa-check"></span> Tire Rotation</li>
            </ul>
            <div className="read-more mt-4 pt-lg-2">
              <a href="contact.html" className="btn btn-style btn-primary"> Go Standard</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Exporting the EditCustomer component
export default EditCustomer;
