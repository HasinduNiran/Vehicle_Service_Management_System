// Importing necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';


const CreateCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState(null);
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const storage = getStorage(app);

  const handleSaveCustomer = () => {
    setLoading(true);

    // Upload image to Firebase Storage
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Progress
      },
      (error) => {
        // Error
        console.error(error);
      },
      () => {
        // Complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Creating data object from form inputs including the download URL
          const data = {
            image: downloadURL,
            firstName,
            lastName,
            NIC,
            phone,
            email,
            username,
            password,
          };

          // Making a POST request to save the customer data
          axios.post('http://localhost:8076/customer', data)
            .then(() => {
              // Resetting loading state and navigating to the home page
              setLoading(false);
              navigate('/customer/allCustomer');
            })
            .catch((error) => {
              // Handling errors by resetting loading state and showing a specific error message
              setLoading(false);
              alert(`An error occurred: ${error.response.data.message}`);
              console.log(error);
            });
        });
      }
    );
  };

  // JSX for rendering the create customer form
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create menu</h1>
      {loading ? <Spinner /> : ''}
      
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Input fields for customer information */}
        {/* Assuming you want to upload an image */}
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveCustomer}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the CreateCustomer component
export default CreateCustomer;
