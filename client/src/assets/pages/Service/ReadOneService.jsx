import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneService = () => {
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/Service/${id}`)
      .then((response) => {
        setService(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Show Service</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Service Name:</span>
            <span>{service.Servicename}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Price:</span>
            <span>{service.Price}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadOneService;
