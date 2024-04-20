import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
//import { AiOutlineEdit } from 'react-icons/ai';
//import { BsInfoCircle } from 'react-icons/bs';
import { CgInsertBeforeO } from "react-icons/cg";
//import { RiDeleteBin3Fill } from "react-icons/ri";



export default function ShowAllLimits() {

  const [bookingLimits, setbookingLimits] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/bookingLimits/')
      .then((response) => {

        setbookingLimits(response.data);
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
        <h1 className='text-3xl my-8'>bookingLimit</h1>
        <Link to='/create'>
          <CgInsertBeforeO className='text-sky-800 text-4xl' />
        </Link>



      </div>
      {loading ? <p>Loading</p> : (
        <table className='w-full border-separate boarder-spacing-2'>
          <thead>
            <tr>
              <th className='border-3 border-slate-600 rounded-md bg-red-500 font-bold text-black'>No</th>
              <th className='border-3 border-slate-600 rounded-md bg-red-500 font-bold text-black'>Booking_Date</th>
              <th className='border-3 border-slate-600 rounded-md bg-red-500 font-bold text-black'>BookingLimit</th>
            </tr>
          </thead>
          <tbody>
            {bookingLimits.map((bookingLimit, index) => (
              <tr key={bookingLimit._id} className='h-8'>
                <td className='border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  {bookingLimit.Booking_Date}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  {bookingLimit.BookingLimit}
                </td>
                <td className='border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
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

