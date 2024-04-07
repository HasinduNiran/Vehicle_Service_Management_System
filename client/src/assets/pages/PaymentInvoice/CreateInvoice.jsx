import React,{useEffect,useState} from 'react'
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateInvoice = () => {
  const[InvoiceId,setInvoiceId] = useState('');
  const[customerName,setcustomerName] = useState('');
  const[PaymentId,setPaymentId] = useState('');
  const[Vehicle_Number,setVehicle_Number] = useState('');
  const[Vehicle_Color,setVehicle_Color] = useState('');
  const[Model,setModel] = useState('');
  const[Year,setYear] = useState('');
  const[Engine_Details,setEngine_Details] = useState('');
  const[PaymentDate,setPaymentDate] = useState('');
  const[totalAmount,settotalAmount] = useState('');
  const[Booking_Id,setBooking_Id] = useState(''); 
  
  //to connect other components
  const [vehicles,setVehicles]= useState([]); 
  const [payments,setPayments] = useState([]);
  
  //to get the data when selecting one
  const[selectedInvoices,setSelectedInvoices] = useState({
    PaymentId:'',
    Vehicle_Number:'',
  });

  const[count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
        .get('http://localhost:8076/vehicles')
        .then((res) => {
            setVehicles(res.data.data);
            setCount(res.data.count);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);

useEffect(() => {
  setLoading(true);
  axios
      .get('http://localhost:8076/payments')
      .then((res) => {
          setPayments(res.data.data);
          setCount(res.data.count);
          setLoading(false);
      })
      .catch((err) => {
          console.log(err);
      });
}, []);


const handleSavePaymentInvoice = () => {
  const data = {
    InvoiceId,
    customerName,
    PaymentId,
    Vehicle_Number,
    Vehicle_Color,
    Model,
    Year,
    Engine_Details,
    PaymentDate,
    totalAmount,
    Booking_Id,
  };

  setLoading(true);
  axios
    .post(`http://localhost:8076/PaymentInvoice`, data)
    .then(() => {
      setLoading(false);
      navigate('/PaymentInvoice/show');
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};


return (
  <div className='p-4'>
    <BackButton destination='/payments/show' /> {/* Pass the destination URL here */}
    <h1 className='text-3xl my-4'>Create Invoice</h1>
    {loading ? <Spinner /> : ''}
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Invoice ID</label>
        <input
          type='text'
          value={InvoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Customer Name</label>
        <input
          type='String'
          value={customerName}
          onChange={(e) => setcustomerName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Vehicle No</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={Vehicle_Number} 
          //onChange={handleVehicleNumberChange}
          onChange={(e) => setVehicle_Number(e.target.value)}
          >
          <option value=''>Select Vehicle NO</option>
          {
            vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.Register_Number}>
                {vehicle.Register_Number}
              </option>
            ))
          }
        </select>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Payment ID</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={PaymentId} 
          //onChange={handleVehicleNumberChange}
          onChange={(e) => setPaymentId(e.target.value)}
          >
          <option value=''>Select Vehicle NO</option>
          {
            payments.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.PaymentId}>
                {vehicle.PaymentId}
              </option>
            ))
          }
        </select>
      </div>
      <div className='my-4'> 
        <label className='text-xl mr-4 text-gray-500'>Color</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={Vehicle_Color} 
          onChange={(e) => setVehicle_Color(e.target.value)}
          >
          <option value=''>Color</option>
          {
            vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.Vehicle_Color}>
                {vehicle.Vehicle_Color}
              </option>
            ))
          }
        </select>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Model</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={Model} 
          onChange={(e) => setModel(e.target.value)}
          >
          <option value=''>Model</option>
          {
            vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.Model}>
                {vehicle.Model}
              </option>
            ))
          }
        </select>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Year</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={Year} 
          onChange={(e) => setYear(e.target.value)}
          >
          <option value=''>Year</option>
          {
            vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.Year}>
                {vehicle.Year}
              </option>
            ))
          }
        </select>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Engine</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={Engine_Details} 
          onChange={(e) => setEngine_Details(e.target.value)}
          >
          <option value=''>Engine</option>
          {
            vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.Engine_Details}>
                {vehicle.Engine_Details}
              </option>
            ))
          }
        </select>
      </div>
      
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Date</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={PaymentDate} 
          onChange={(e) => setPaymentDate(e.target.value)}
          >
          <option value=''>Date</option>
          {
            payments.map((payment) => (
              <option key={payment._id} value={payment.PaymentDate}>
                {payment.PaymentDate}
              </option>
            ))
          }
        </select>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Amount</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={totalAmount} 
          onChange={(e) => settotalAmount(e.target.value)}
          >
          <option value=''>Amount</option>
          {
            payments.map((payment) => (
              <option key={payment._id} value={payment.totalAmount}>
                {payment.totalAmount}
              </option>
            ))
          }
        </select>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Service ID</label>
        <select
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={Booking_Id} 
         
          onChange={(e) => setBooking_Id(e.target.value)}
          >
          <option value=''>Service id</option>
          {
            payments.map((payment) => (
              <option key={payment._id} value={payment.Booking_Id}>
                {payment.Booking_Id}
              </option>
            ))
          }
        </select>
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleSavePaymentInvoice}>
        Save
      </button>
    </div>
  </div>
);
}


export default CreateInvoice