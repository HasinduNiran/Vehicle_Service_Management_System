import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    
    axios.get('http://localhost:8076/feedback')
    
   .then((response) => {
        setFeedbacks(response.data.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
      });
      
  }, []);



  return (
    <div className='p-4'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>All Feedbacks</h1>
        <Link to={'/feedback/create'} className='bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Feedback</Link>
      </div>
      {loading? (
        <div>Loading...</div>
      ) : (
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='border border-green-800 rounded-md'>Name</th>
              <th className='border border-green-800 rounded-md'>Email</th>
              <th className='border border-green-800 rounded-md'>phone_number</th>
              <th className='border border-green-800 rounded-md'>Employee</th>
              <th className='border border-green-800 rounded-md'>date of service</th>
              <th className='border border-green-800 rounded-md'>message</th>
              <th className='border border-green-800 rounded-md'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className='border border-gray-600 rounded-md'>{feedback.name}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.email}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.phone_number}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.employee}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.date_of_service}</td>
                <td className='border border-gray-600 rounded-md'>{feedback.message}</td>
                <td className='border border-gray-600 rounded-md'>
                  <Link to={`/feedback/edit/${feedback._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                  
                  <Link to={`/feedback/get/${feedback._id}`} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>view</Link>
                  <Link to={`/feedback/delete/${feedback._id}`} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>delete</Link>
                </td>
              </tr>
            ))}
          </tbody>




        </table>


      )}
      
    </div>
  );
};

export default ShowAllFeedback