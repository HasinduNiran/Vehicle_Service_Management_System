import React ,{ useEffect,useState} from 'react';
import axios from 'axios';
import{ usePrams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ReadOneFeedback = () => {
  const {feedback, setFeedback} = useState({});
  const {loading, setloading} = useState(false);
  const { id } = usePrams();

  useEffect(() => {
    setloading(true);
    axios
    .get('http://localhost:8076')
    .then((response) => {
      setFeedback(response.data);
      setloading(false);

    })
    .catch((error) => {
      console.log(error);
      setloading(false);
    });
   });

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3x1 my-4'>ReadOneFeedback</h1>
      {loading ? (
        <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
        <div className='my-4'>
          <span className='text-x1 mr-4 txt-gray-500'>Id</span>
          <span>{feedback._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-x1 mr-4 txt-gray-500'>Name</span>
          <span>{feedback.name}</span>
        </div>
        <div className='my-4'>
          <span className='text-x1 mr-4 txt-gray-500'>Email</span>
          <span>{feedback.email}</span>
        </div>
        <div className='my-4'>
          <span className='text-x1 mr-4 txt-gray-500'>Phone Number</span>
          <span>{feedback.phone_number}</span>
        </div>
        <div className='my-4'>
          <span className='text-x1 mr-4 txt-gray-500'>Employee</span>
          <span>{feedback.employee}</span>
        </div>
        <div className='my-4'>
          <span className='text-x1 mr-4 txt-gray-500'>Date of Service</span>
          <span>{new Date(feedback.date_of_service).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-x1 mr-4 txt-gray-500'>Message</span>
          <span>{feedback.message}</span>
        </div>
        </div>
      )}
      </div>
  );
}

export default ReadOneFeedback;
