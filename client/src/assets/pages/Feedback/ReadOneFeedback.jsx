
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneFeedback = () => {
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchFeedback = () => {
    setLoading(true);
    axios.get(`http://localhost:8076/api/feedback/${id}`)
      .then((response) => {
        setFeedback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>ReadOneFeedback</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          {Object.entries(feedback).map(([key, value]) => (
            <div className='my-4' key={key}>
              <span className='text-xl mr-4 text-gray-500'>{key}</span>
              <span>{key === 'date_of_service' ? new Date(value).toString() : value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadOneFeedback;
