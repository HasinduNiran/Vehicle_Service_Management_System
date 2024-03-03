import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

const ShowAllFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8076/feedback')
      .then(response => {
        setFeedback(response.data); // Update this line to set correct data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl m-8'>Feedback List</h1>
      {feedback.map((item) => (
        <div key={item.id} className='flex justify-between items-center'>
          <Link to={`/feedback/create/${item.id}`}>
            <BsInfoCircle className='text-2xl text-green-800' />
          </Link>
          <Link to={`/feedback/edit/${item.id}`}>
            <AiOutlineEdit className='text-2xl text-yellow-600' />
          </Link>
          <Link to={`/feedback/delete/${item.id}`}>
            <MdDelete className='text-2xl text-red-600' />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShowAllFeedback;
