import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bc';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowAllFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/feedback')
      .then(response => {
        setFeedback(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        // Handle error (e.g., set error state)
        console.error('Error fetching feedback:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once on component mount

  if (loading) {
    return <Spinner />; // Display spinner while loading
  }

  return (
    <div className='p-4'>
      {/* Display feedback data */}
      {feedback.map((item) => (
        <div key={item.id} className='flex justify-between item-center'>
          <h1 className='text-3x1 m-8'>Feedback List</h1>
          <Link to={`/feedback/Create/${feedback_id}`}>
            <BsInfoCircle className='text-2x1 text-green-800'/>
          </Link>
          <Link to={`/feedback/edit/${feedback_id}`}>
            <AiOutlineEdit className='text-2x1 text-yellow-600'/>
          </Link>
          <Link to={`/feedback/delete/${feedback_id}`}>
            <MdOutlineDelete className='text-2x1 text-ed-600'/>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShowAllFeedback;
