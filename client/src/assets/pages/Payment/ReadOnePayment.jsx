import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ReadOnePayment=()=> {
  const[payment,setPayment] = useState({});
  const[loading,setLoading] = useState(false);
  const{id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:8076/payments/${id}`)
    .then(res=>{
      setPayment(res.data);
      setLoading(false);
    })
    .catch((error)=>{
      setPayment(res.data);
      setLoading(false);
  });
},[])

  return (
    <div className='p-4'>
      <BackButton destination='/payments/show' /> {/* Pass the destination URL here */}
    <h1 className='text-3xl my-4'>Payment</h1>
    {loading ? (
      <Spinner />
    ) : (
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{payment._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Payment ID</span>
          <span>{payment.PaymentId}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Date</span>
          <span>{payment.PaymentDate}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Amount</span>
          <span>{payment.totalAmount}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Method</span>
          <span>{payment.PaymentMethod}</span>
        </div>
      </div>
    )}
  </div>
)

//without css

// return (
//   <div>
//    <center>
//   <h1>Payment</h1>
//   <br></br>
//   <br></br>
//   <br></br>
//   {loading ? (
//     <Spinner />
//   ) : (
//     <div>
      
//         <span >Id:</span>
//         <span>{payment._id}</span>
//         <br></br>
//         <br></br>

//         <span>Payment ID:</span>
//         <span>{payment.PaymentId}</span>
//         <br></br>
//         <br></br>

//         <span>Date:</span>
//         <span>{payment.PaymentDate}</span>
//         <br></br>
//         <br></br>

//         <span>Amount:</span>
//         <span>{payment.totalAmount}</span>
//         <br></br>
//         <br></br>

//         <span>Method:</span>
//         <span>{payment.PaymentMethod}</span>
//         <br></br>
//     </div>
//   )}
//   </center>
// </div>
// )
}

export default ReadOnePayment