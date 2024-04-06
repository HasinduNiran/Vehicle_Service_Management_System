import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useSnackbar } from 'notistack';

const CreatePayments = () => {
  const [PaymentId, setPaymentId] = useState('');
  const [cusID,setCusID] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [totalAmount, settotalAmount] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();

  const handleSavePayment = () => {
    const data = {
      PaymentId,
      cusID,
      PaymentDate,
      totalAmount,
      PaymentMethod,
    };
    setLoading(true);
    axios
      .post(`http://localhost:8076/payments`, data)
      .then(() => {
        setLoading(false);
        //enqueueSnackbar('Employee Created successfully', { variant: 'success' });
        navigate('/payments/show');
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
      <BackButton destination='/payments/show' /> {/* Pass the destination URL here */}
      <h1 className='text-3xl my-4'>Create Payment</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PaymentId</label>
          <input
            type='text'
            value={PaymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Payment Date</label>
          <input
            type='Date'
            value={PaymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Cus id</label>
          <input
            type='String'
            value={cusID}
            onChange={(e) => setCusID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>totalAmount</label>
          <input
            type='number'
            value={totalAmount}
            onChange={(e) => settotalAmount(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Payment Method</label>
          <select
            value={PaymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
       
        <button className='p-2 bg-sky-300 m-8' onClick={handleSavePayment}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreatePayments
