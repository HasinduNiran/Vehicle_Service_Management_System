import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useSnackbar } from 'notistack';

const CreateEmployee = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [DOB, setDOB] = useState('');
  const [NIC, setNIC] = useState('');
  const [Address, setAddress] = useState('');
  const [Position, setPosition] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();

  const handleSaveEmployee = () => {
    const data = {
      EmpID,
      employeeName,
      DOB,
      NIC,
      Address,
      Position,
      ContactNo,
      Email
    };
    setLoading(true);
    axios
      .post('http://localhost:8076/employees', data)
      .then(() => {
        setLoading(false);
        //enqueueSnackbar('Employee Created successfully', { variant: 'success' });
        navigate('/employees/allEmployee');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        //enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/employees/allEmployee' /> {/* Pass the destination URL here */}
      <h1 className='text-3xl my-4'>Create Employee</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EmpID</label>
          <input
            type='text'
            value={EmpID}
            onChange={(e) => setEmpID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>employeeName</label>
          <input
            type='text'
            value={employeeName}
            onChange={(e) => setemployeeName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>DOB</label>
          <input
            type='Date'
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>NIC</label>
          <input
            type='text'
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Address</label>
          <input
            type='text'
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Position</label>
          <input
            type='text'
            value={Position}
            onChange={(e) => setPosition(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>ContactNo</label>
          <input
            type='text'
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type='text'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveEmployee}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateEmployee