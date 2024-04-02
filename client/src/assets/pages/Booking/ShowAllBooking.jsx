import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { CgInsertBeforeO } from "react-icons/cg";
import { RiDeleteBin3Fill } from "react-icons/ri";


export default function ShowAllBooking() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/bookings/')
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
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Booking</h1>
        <Link to='/create'>
          <CgInsertBeforeO className='text-sky-800 text-4xl' />
        </Link>



      </div>
      {loading ? <p>Loading</p> : (
        <table className='w-full border-separate boarder-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Customer_Name</th>
              <th className='border border-slate-600 rounded-md'>Vehicle_Type</th>
              <th className='border border-slate-600 rounded-md'>Vehicle_Number</th>
              <th className='border border-slate-600 rounded-md'>Contact_Number</th>
              <th className='border border-slate-600 rounded-md'>Email</th>
              <th className='border border-slate-600 rounded-md'>Action</th>






            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className='h-8'>
                <td className='border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  {booking.Customer_Name}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  {booking.Vehicle_Type}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  {booking.Vehicle_Number}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  {booking.Contact_Number}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  {booking.Email}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/booking/read/${booking._id}`}>
                      <BsInfoCircle className='text-sky-800 text-2xl' />
                    </Link>
                    <Link to={`/edit/${booking._id}`}>
                      <AiOutlineEdit className='text-sky-800 text-2xl' />
                    </Link>
                    <Link to={`/booking/delete/${booking._id}`}>
                      <RiDeleteBin3Fill className='text-sky-800 text-2xl' />
                    </Link>

                  </div>



                </td>


              </tr>



            ))}


          </tbody>


        </table>
      )}
    </div>
  )
}

