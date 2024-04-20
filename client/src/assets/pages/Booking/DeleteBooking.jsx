import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const DeleteBooking = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBooking = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8076/bookings/${id}`)
      .then(() => {
        setLoading(false);
        alert('Successfully deleted');
        navigate('/booking/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check Console for more information');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>DeleteBooking</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2  border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
      <h3 className='text-2xl'>Are you sure to delete this booking?</h3>

      <button
        className='p-4 bg-red-600 text-white m-1 w-full'
        onClick={handleDeleteBooking}
      >
        Yes,Delete it

      </button>

    </div>


    </div >
  )
}

export default DeleteBooking