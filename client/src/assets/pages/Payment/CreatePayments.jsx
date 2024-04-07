import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useSnackbar } from 'notistack';

const CreatePayments = () => {
  //const [empname, setEmpname] = useState('');
  const [PaymentId, setPaymentId] = useState('');
  const [cusID,setCusID] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [totalAmount, settotalAmount] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  //const [Booking_Id, setBooking_Id] = useState('');
 // const [employees, setEmployees] = useState([]);
  const [servicehistory,setServiceHistory]= useState([]);

  const [loading, setLoading] = useState(false);
  //const [serviceHistory, setServiceHistory] = useState([]); // Define serviceHistory state
  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();

  // const [selectedService,setSelectedService]=useState({
  //   Booking_Id:'',
  //   VehicleNo:''
  // });

  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:8076/servicehistory')
      .then((response) => {
        setServiceHistory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  
  //  const handleServiceIdChange=(e)=>{
  //   const selectedBooking_Id = e.target.value;
  //   const selectedSr = servicehistory.find((service) => service.Booking_Id === selectedBooking_Id);
  // setSelectedService({
  //   ...selectedService,
  //    Booking_Id: selectedBooking_Id,
  //    VehicleNo: selectedSr.VehicleNo,
  //   });
  // };

  // const handleVehicleNumberChange=(e)=>{
  //   const selectedVehicleNo = e.target.value;
  //   const selectedsr = servicehistory.find(
  //     (service) => service.VehicleNo === selectedVehicleNo);
  // setSelectedService({
  //   ...selectedService,
  //    Booking_Id: selectedsr.Booking_Id,
  //    VehicleNo: selectedVehicleNo,
  //   });
  // };

  const handleSavePayment = () => {
    const data = {
      empname,
      PaymentId,
      //cusID,
      Vehicle_Number,
      // selectedService.VehicleNo,
      PaymentDate,
      totalAmount,
      PaymentMethod,
      //Booking_Id: selectedService.Booking_Id,
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
          <label className='text-xl mr-4 text-gray-500'>Customer id</label>
          <input
            type='String'
            value={cusID}
            onChange={(e) => setCusID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        {/* <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Service ID</label>
          <select
            value={selectedService.Booking_Id}
            onChange={handleServiceIdChange}
            className='border-2 border-gray-500 px-4 py-2  w-full '
            >
              <option value=''>Select Service ID</option>
              {
                servicehistory.map((service) => ( 
                  <option key={service.Booking_Id} value={service.Booking_Id}>
                    {service.Booking_Id}
                  </option>
                ))
              }
          </select>
        </div> */}
        {/* <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Emp Name</label>
          <select
            className='border-2 border-gray-500 px-4 py-2  w-full '
            value={empname}
            onChange={(e) => setEmpname(e.target.value)}
            
            >
              <option value=''>Select emp</option>
              {
                employees.map((employee) => (
                  <option key={employee._id} value={employee.employeeName}>
                    {employee.employeeName}
                  </option>
                ))
              }
          </select>
        </div> */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>V no</label>
          <select
            className='border-2 border-gray-500 px-4 py-2  w-full '
            value={Vehicle_Number}
            onChange={(e) => setVehicle_Number(e.target.value)}
            
            >
            <option value=''>Select</option>
            {
              servicehistory.map((service) => (
                <option key={service._id} value={service.Vehicle_Number}>
                  {service.Vehicle_Number}
                </option>
              ))
            }

          </select>
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
