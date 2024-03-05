import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('/feedback')
      .then((response) => {
        setFeedbacks(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
        setError('An error occurred while fetching the feedbacks. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>All Feedbacks</h1>
        <Link to='/feedback/create' className='bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-green-800 rounded-md'>Name</th>
              <th className='border border-green-800 rounded-md'>Email</th>
              <th className='border border-green-800 rounded-md'>Phone Number</th>
              <th className='border border-green-800 rounded-md'>Employee</th>
              <th className='border border-green-800 rounded-md'>Date of Service</th>
              <th className='border border-green-800 rounded-md'>Message</th>
              <th className='border border-green-800 rounded-md'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className='h-8'>
                <td className='border border-gray-600 rounded-md'>{feedback.name}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.email}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.phone_number}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.employee}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.date_of_service}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.message}</td>
                <td className='border border-gray-600 rounded-md'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/feedback/get/${feedback._id}`}>
                      <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/feedback/edit/${feedback._id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/feedback/delete/${feedback._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllFeedback;
