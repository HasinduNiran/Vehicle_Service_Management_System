import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const DeleteServiceHistory = () => {

  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:8076/servicehistory/${id}`)
    
   .then(() => {
        setLoading(false);
        navigate('/');
      }).catch(() => {
        setLoading(false);
        console.error('Error deleting service',error);

      });

  };


  return (
    <>
      <div className='p-4'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Delete Service History</h1>
        </div>
        <div className='text-center'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleDelete}>Delete</button>

          <Link to={'/servicehistory'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Cancel</Link>
        </div>
      </div>
    </>
  )
}

export default DeleteServiceHistory