import React,{useState} from 'react'
import BackButton from '../../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateFeedback = () =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_Number] = useState('');
  const [employee, setEmployee] = useState('');
  const [date_of_service, setDate_of_Service] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const useNavigate = useNavigate(true);
  const handleSaveFeedback = () => {
    const data = {
      name,
      email,
      phone_number,
      employee,
      date_of_service,
      message
    };
    setLoading(true);
    axios
      .post('http://localhost:8076/feedback', data)
      .then( () => {
        setLoading(false);
        navigate('/')
      })
      .catch(( error) => {
        setLoading(false);
        alert('An error occurred.Please check the console and try again')
        console.log(error);
      });
  };

  return (
    <div className='p-4 '>
      <BackButton/>
      <h1 className='text-3x1 my-4'>CreateFeedback</h1>
      {loading ? <Spinner/>: '' }
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
      <div className='p-4'>
          <label className='text-x1 mr-4 text-gray-500'>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='p-4'>
          <label className='text-x1 mr-4 text-gray-500'>Email</label>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='p-4'>
          <label className='text-x1 mr-4 text-gray-500'>Phone Number</label>
          <input type='text' value={phone_number} onChange={(e) => setPhone_Number(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='p-4'>
          <label className='text-x1 mr-4 text-gray-500'>Employee</label>
          <input type='text' value={employee} onChange={(e) => setEmployee(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='p-4'>
          <label className='text-x1 mr-4 text-gray-500'>Date of the Service</label>
          <input type='text' value={date_of_service} onChange={(e) => setDate_of_Service(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <div className='p-4'>
          <label className='text-x1 mr-4 text-gray-500'>Message</label>
          <input type='text' value={message} onChange={(e) => setMessage(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleSaveFeedback}>
      Create
      </button>
      </div>
      </div>
  )
}

export default CreateFeedback