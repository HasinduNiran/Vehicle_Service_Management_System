import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ReadOneInvoice = () => {
  const [paymentInvoice, setPaymentInvoice] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/PaymentInvoice/${id}`)
      .then(res => {
        setPaymentInvoice(res.data);
        setLoading(false);
      })
      .catch(error => {
        setPaymentInvoice({});
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='company-details' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='company-info' style={{ width: '50%' }}>
          <h2>Nadeeka Auto Service</h2>
          <p>Kurunegala, Sri Lanka</p>
          <p>Phone: 07700000001</p>
        </div>
        <div className='invoice-details' style={{ width: '45%' }}>
          <BackButton destination='/PaymentInvoice/show' />
          <h1 className='text-3xl my-4'>Payment Invoice</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className='invoice-data' style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '20px' }}>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Invoice ID:</span>
                <span>{paymentInvoice.InvoiceId}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Customer Name:</span>
                <span>{paymentInvoice.customerName}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Service ID:</span>
                <span>{paymentInvoice.PaymentMethod}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Payment ID:</span>
                <span>{paymentInvoice.PaymentId}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Vehicle No:</span>
                <span>{paymentInvoice.Vehicle_Number}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Color:</span>
                <span>{paymentInvoice.Vehicle_Color}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Model:</span>
                <span>{paymentInvoice.Model}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Year:</span>
                <span>{paymentInvoice.Year}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Engine:</span>
                <span>{paymentInvoice.Engine_Details}</span>
              </div>
            </div>
          )}
          <div className='total-amount' style={{ marginTop: '20px' }}>
            <span className='text-xl mr-4 text-gray-500'>Total Amount:</span>
            <span>{paymentInvoice.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOneInvoice;
