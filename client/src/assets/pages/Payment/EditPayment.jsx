import React, { useEffect } from 'react';
 import { useState } from 'react';
 import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPayment = () => {

  const [PaymentId, setPaymentId] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [totalAmount, settotalAmount] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:8076/payments/${id}`)
    .then((response)=>{
      setPaymentId(response.data.PaymentId);
      setPaymentDate(response.data.PaymentDate);
      settotalAmount(response.data.totalAmount);
      setPaymentMethod(response.data.PaymentMethod);
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      alert('An error occurred');
      console.log(error);
  });
  },[])
  const handleEditPayment = () => {
    const data = {
      PaymentId,
      PaymentDate,
      totalAmount,
      PaymentMethod,
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/payments/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/payments/show');
      })
      .catch((err)=> {
        setLoading(false);
        alert('An error happened');
        console.log(err);
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
          <label className='text-xl mr-4 text-gray-500'>totalAmount</label>
          <input
            type='number'
            value={totalAmount}
            onChange={(e) => settotalAmount(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className="form-input-container">
          <label className='form-label'>Payment Method</label>
          <div>
            <input
              type='radio'
              value='cash'
              checked={PaymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className='form-input'
            />
            <label className='form-label'>Cash</label>
          </div>
          <div>
            <input
              type='radio'
              value='card'
              checked={PaymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className='form-input'
            />
            <label className='form-label'>Card</label>
          </div>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditPayment}>
          Save
        </button>

    
    
      </div>
    </div>
  );
}

export default EditPayment;
