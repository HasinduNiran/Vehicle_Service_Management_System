import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ReadOneFeedback = () => {
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/api/feedback/${id}`)
      .then((response) => {
        setFeedback(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>ReadOneFeedback</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{feedback._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{feedback.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email</span>
            <span>{feedback.email}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Phone Number</span>
            <span>{feedback.phone_number}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Employee</span>
            <span>{feedback.employee}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date of Service</span>
            <span>{new Date(feedback.date_of_service).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Message</span>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneFeedback;
