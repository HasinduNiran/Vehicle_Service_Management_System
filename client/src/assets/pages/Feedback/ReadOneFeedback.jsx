import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneFeedback = () => {
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8076/feedback/${id}`);
        setFeedback(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle error state here if needed
      }
    };
    fetchData();
  }, [id]);

  if (loading || !feedback.name) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Feedback Details</h1>
      <a href="/feedback" className="text-blue-500 hover:underline mb-2 block">Back to Feedback</a>
      <p className="mb-2"><span className='font-bold'>Name:</span> {feedback.name}</p>
      <p className="mb-2"><span className='font-bold'>Email:</span> {feedback.email}</p>
      <p className="mb-2"><span className='font-bold'>Message:</span> {feedback.message}</p>
      <p className="mb-2"><span className='font-bold'>Phone Number:</span> {feedback.phone_number}</p>
      <p className="mb-2"><span className='font-bold'>Employee:</span> {feedback.employee}</p>
      <p className="mb-2"><span className='font-bold'>Date of Service:</span> {feedback.date_of_service}</p>
    </div>
  );
};

export default ReadOneFeedback;
