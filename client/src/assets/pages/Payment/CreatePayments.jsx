import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePayments = () => {
  const [PaymentId, setPaymentId] = useState('');
  const [cusID, setCusID] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [Booking_Id, setBooking_Id] = useState('');
  const [Servicehistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   //to validation initial value
  const initialValues = {
    PaymentId: '',
    cusID: '',
    Vehicle_Number: '',
    PaymentDate: '',
    totalAmount: '',
    PaymentMethod: '',
    Booking_Id: ''
  };


//validation
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleSavePayment();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.PaymentId) {
      errors.PaymentId = "PaymentId is required!";
    }
    if (!values.cusID) {
      errors.cusID = "Customer ID is required!";
    }
    if (!values.Booking_Id) {
      errors.Booking_Id = "Service ID is required!";
    }
    if (!values.Vehicle_Number) {
      errors.Vehicle_Number = "Vehicle Number is required!";
    }
    if (!values.PaymentDate) {
      errors.PaymentDate = "Payment Date is required!";
    }
    if (!values.totalAmount) {
      errors.totalAmount = "Total Amount is required!";
    }
    if (!values.PaymentMethod) {
      errors.PaymentMethod = "Payment Method is required!";
    }
    return errors;
  };
   

  //to get the service data
  const [selectedService, setSelectedService] = useState({
    Booking_Id: '',
    Vehicle_Number: ''
  });


  //save the payment details
  const handleSavePayment = () => {
    const data = {
      PaymentId: formValues.PaymentId,
      cusID: formValues.cusID,
      Booking_Id: formValues.Booking_Id,
      Vehicle_Number: formValues.Vehicle_Number,
      PaymentDate: formValues.PaymentDate,
      totalAmount: formValues.totalAmount,
      PaymentMethod: formValues.PaymentMethod,
    };


    setLoading(true);
    axios
      .post(`http://localhost:8076/payments`, data)
      .then(() => {
        setLoading(false);
        navigate('/payments/show');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };


//call service history
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/ServiceHistory')
      .then((res) => {
        setServiceHistory(res.data.service);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


//to display one after entering another

  const handleServiceIdChange = (e) => {
    const selectedBooking_Id = e.target.value;
    const selectedSr = Servicehistory.find((service) => service.Booking_Id === selectedBooking_Id);
    
    setSelectedService({
      ...selectedService,
      Booking_Id: selectedBooking_Id,
      Vehicle_Number: selectedSr.Vehicle_Number,
    });
    setFormValues({ ...formValues, Booking_Id: selectedBooking_Id, Vehicle_Number: selectedSr.Vehicle_Number });
  };

  const handleVehicleNumberChange = (e) => {
    const selectedVehicle_Number = e.target.value;
    const selectedsr = Servicehistory.find((service) => service.Vehicle_Number === selectedVehicle_Number);
    
    setSelectedService({
      ...selectedService,
      Booking_Id: selectedsr.Booking_Id,
      Vehicle_Number: selectedVehicle_Number,
    });
    setFormValues({ ...formValues, Booking_Id: selectedsr.Booking_Id, Vehicle_Number: selectedVehicle_Number });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/payments/show' />
      <h1 className='text-3xl my-4'>Create Payment</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>PaymentId</label>
            <input
              type='text'
              name='PaymentId'
              value={formValues.PaymentId}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formErrors.PaymentId && <p className='text-red-500'>{formErrors.PaymentId}</p>}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Customer id</label>
            <input
              type='String'
              name='cusID'
              value={formValues.cusID}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formErrors.cusID && <p className='text-red-500'>{formErrors.cusID}</p>}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Service ID</label>
            <select
              name='Booking_Id'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={formValues.Booking_Id}
              onChange={handleServiceIdChange}
            >
              <option value=''>Select Service ID</option>
              {Servicehistory.map((service) => (
                <option key={service._id} value={service.Booking_Id}>
                  {service.Booking_Id}
                </option>
              ))}
            </select>
            {formErrors.Booking_Id && <p className='text-red-500'>{formErrors.Booking_Id}</p>}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Vehicle No</label>
            <select
              name='Vehicle_Number'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={formValues.Vehicle_Number}
              onChange={handleVehicleNumberChange}
            >
              <option value=''>Select Vehicle Number</option>
              {Servicehistory.map((service) => (
                <option key={service._id} value={service.Vehicle_Number}>
                  {service.Vehicle_Number}
                </option>
              ))}
            </select>
            {formErrors.Vehicle_Number && <p className='text-red-500'>{formErrors.Vehicle_Number}</p>}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Payment Date</label>
            <input
              type='Date'
              name='PaymentDate'
              value={formValues.PaymentDate}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formErrors.PaymentDate && <p className='text-red-500'>{formErrors.PaymentDate}</p>}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>totalAmount</label>
            <input
              type='number'
              name='totalAmount'
              value={formValues.totalAmount}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formErrors.totalAmount && <p className='text-red-500'>{formErrors.totalAmount}</p>}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Payment Method</label>
            <select
              name='PaymentMethod'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={formValues.PaymentMethod}
              onChange={handleChange}
            >
              <option value=''>Select Payment Method</option>
              <option value='cash'>Cash</option>
              <option value='card'>Card</option>
            </select>
            {formErrors.PaymentMethod && <p className='text-red-500'>{formErrors.PaymentMethod}</p>}
          </div>
          <button className='p-2 bg-sky-300 m-8' type='submit'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePayments;