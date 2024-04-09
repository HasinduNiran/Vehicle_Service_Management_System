import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';

const ShowInvoice=()=> {

  const [paymentInvoices,setPaymentInvoices] = useState([]); 
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    axios
    .get('http://localhost:8076/PaymentInvoice')
    .then((response)=>{
      setPaymentInvoices(response.data.data);
     setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);
  return (
    <div className='p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Invoices </h1>
            

            <div className="flex justify-center items-center mt-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/PaymentInvoice/create'}>
                    Add Payment Invoice
                    </button>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/payments/report'}>
                        Report
                    </button>
                </div>
        </div>
        {loading ? (
            <div className='flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                    <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Invoice ID</th>
                        <th className='border border-slate-600 rounded-md'>Customer Name</th>
                        <th className='border border-slate-600 rounded-md '>Vehicle No</th>
                        <th className='border border-slate-600 rounded-md'>Payment ID</th>
                        <th className='border border-slate-600 rounded-md '>Color</th>
                        <th className='border border-slate-600 rounded-md'>Model</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Year</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Engine</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Date</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Amount</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Service ID</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentInvoices.map((paymentInvoice, index) => (

                        <tr key={paymentInvoice._id} className='h-8'>

                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.InvoiceId}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.customerName}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.Vehicle_Number}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.PaymentId}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.Vehicle_Color}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.Model}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.Year}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.Engine_Details}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.PaymentDate}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.totalAmount}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {paymentInvoice.Booking_Id}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/PaymentInvoice/read/${paymentInvoice._id}`}>
                                    <BsInfoCircle className='text-2x1 text-green-800' />
                                    </Link>
                                    <Link to={`/PaymentInvoice/edit/${paymentInvoice._id}`}>
                                    <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                    </Link>
                                    <Link to={`/PaymentInvoice/delete/${paymentInvoice._id}`}>
                                    <MdOutlineDelete className='text-2x1 text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
)
                    

                    }

export default ShowInvoice