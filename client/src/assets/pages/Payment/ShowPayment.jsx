//import React from 'react'
import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';

const ShowPayment=()=> {

  const [payments,setPayments] = useState([]); 
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    axios
    .get('http://localhost:8076/payments')
    .then((response)=>{
      setPayments(response.data.data);
     setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);
  return (
    <div className='p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Payment List</h1>
            

            <div className="flex justify-center items-center mt-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/payments/create'}>
                    Add Payment
                    </button>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/PaymentInvoice/show'}>
                    Invoices
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
                        <th className='border border-slate-600 rounded-md'>Payment ID</th>
                        <th className='border border-slate-600 rounded-md '>Customer Id</th>
                        <th className='border border-slate-600 rounded-md'>Service ID</th>
                        <th className='border border-slate-600 rounded-md '>Vehicle NO</th>
                        <th className='border border-slate-600 rounded-md '>Package</th>
                        <th className='border border-slate-600 rounded-md '>Service name</th>
                        <th className='border border-slate-600 rounded-md'>Date</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Package Amount</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Service Amount</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Total Amount</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Payment Method</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (

                        <tr key={payment._id} className='h-8'>

                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.PaymentId}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.cusID}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.Booking_Id}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.Vehicle_Number}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.Package}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.selectedServices}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.PaymentDate}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.Pamount}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.Samount}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.totalAmount}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {payment.PaymentMethod}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/payments/detail/${payment._id}`}>
                                    <BsInfoCircle className='text-2x1 text-green-800' />
                                    </Link>
                                    <Link to={`/payments/edit/${payment._id}`}>
                                    <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                    </Link>
                                    <Link to={`/payments/delete/${payment._id}`}>
                                    <MdOutlineDelete className='text-2x1 text-red-600' />
                                    </Link>
                                    {/* <Link to={`/PaymentInvoice/create/${payment._id}`}>
                                        Invoice</Link> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
)
                    
// return (
//     <div style={{ fontFamily: 'Arial, sans-serif' }}>
//         <h2>All Payments</h2>
//         <Link to={`/payments/create`} style={{ marginRight: '10px' }}>Add</Link>
//         {loading ? (
//             <Spinner />
//         ) : (
//             <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f2f2f2' }}>
//                         <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>No</th>
//                         <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Payment ID</th>
//                         <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Date</th>
//                         <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Total Amount</th>
//                         <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Payment Method</th>
//                         <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Operation</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payments.map((payment, index) => (
//                         <tr key={payment._id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2' }}>
//                             <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{index + 1}</td>
//                             <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{payment.PaymentId}</td>
//                             <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{payment.PaymentDate}</td>
//                             <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{payment.totalAmount}</td>
//                             <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{payment.PaymentMethod}</td>
//                             <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
//                                 <Link to={`/payments/detail/${payment._id}`} style={{ marginRight: '5px' }}>Read</Link>
//                                 <Link to={`/payments/edit/${payment._id}`} style={{ marginRight: '5px' }}>Edit</Link>
//                                 <Link to={`/payments/delete/${payment._id}`}>Delete</Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         )}
//     </div>
// );
                    }

export default ShowPayment