import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';




export default function ReadOneBooking() {

  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/bookings/${id}`)
      .then((response) => {

        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

      });

  }, []);

  return (


    <div className='p-4'>
      <h1 className='text-3xl my-4'>Show Booking</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className= 'my-4'>
             <span className= 'text-xl mr-4 text-gray-400'>Id</span>
             <span>{booking._id}</span>
        </div>
        <div className= 'my-4'>
             <span className= 'text-xl mr-4 text-gray-400'>Customer-ID</span>
             <span>{booking.cusID}</span>
        </div>
        <div className= 'my-4'>
             <span className= 'text-xl mr-4 text-gray-400'>Customer-Name</span>
             <span>{booking.Customer_Name}</span>
        </div>
        <div className= 'my-4'>
             <span className= 'text-xl mr-4 text-gray-400'>Vehicle-Type</span>
             <span>{booking.Vehicle_Type}</span>
        </div>
        <div className= 'my-4'>
             <span className= 'text-xl mr-4 text-gray-400'>Vehicle-Number</span>
             <span>{booking.Vehicle_Number}</span>
        </div>
        <div className= 'my-4'>
             <span className= 'text-xl mr-4 text-gray-400'>Contact-Number</span>
             <span>{booking.Contact_Number}</span>
        </div>
        <div className= 'my-4'>
             <span className= 'text-xl mr-4 text-gray-400'>Email</span>
             <span>{booking.Email}</span>
        </div>



        </div>
      )}
    </div>


  )
}

