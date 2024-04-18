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
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [Booking_Id, setBooking_Id] = useState('');
  const [Package, setPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState('');
  const [Pamount, setPamount] = useState('');
  const [Samount, setSamount] = useState('');
  const [Servicehistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    PaymentId: '',
    cusID: '',
    Vehicle_Number: '',
    PaymentDate: '',
    PaymentMethod: '',
    Booking_Id: '',
    Package: '',
    selectedServices: '',
    Pamount: '',
    Samount: ''
  };

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
    // if (!values.cusID) {
    //   errors.cusID = "Customer ID is required!";
    // }
    if (!values.Booking_Id) {
      errors.Booking_Id = "Service ID is required!";
    }
    if (!values.Vehicle_Number) {
      errors.Vehicle_Number = "Vehicle Number is required!";
    }
    if (!values.PaymentDate) {
      errors.PaymentDate = "Payment Date is required!";
     }
    // if (!values.totalAmount) {
    //   errors.totalAmount = "Total Amount is required!";
    // }
    if (!values.PaymentMethod) {
      errors.PaymentMethod = "Payment Method is required!";
    }
    if (!values.Package) {
      errors.Package = "Package is required!";
    }
    // if (!values.selectedServices) {
    //   errors.selectedServices = "Service is required!";
    // }
    return errors;
  };

  const calculateTotalAmount = () => {
    return (parseFloat(formValues.Pamount) || 0) + (parseFloat(formValues.Samount) || 0);
  };

  const totalAmount = calculateTotalAmount();

  const handleSavePayment = () => {
    const data = {
      PaymentId: formValues.PaymentId,
      cusID: formValues.cusID,
      Booking_Id: formValues.Booking_Id,
      Vehicle_Number: formValues.Vehicle_Number,
      PaymentDate: formValues.PaymentDate,
      totalAmount: totalAmount, // Use the calculated total amount here
      PaymentMethod: formValues.PaymentMethod,
      Package: formValues.Package,
      selectedServices: formValues.selectedServices,
      Pamount: formValues.Pamount,
      Samount: formValues.Samount
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

  const handleServiceIdChange = (e) => {
    const selectedBooking_Id = e.target.value;
    const selectedServiceEntry = Servicehistory.find((service) => service.Booking_Id === selectedBooking_Id);
    
    if (selectedServiceEntry) {
      setVehicle_Number(selectedServiceEntry.Vehicle_Number);
      setPackage(selectedServiceEntry.Package);
      setSelectedServices(selectedServiceEntry.selectedServices);
      setCusID(selectedServiceEntry.cusID);
    
      setFormValues({
        ...formValues,
        Booking_Id: selectedBooking_Id,
        Vehicle_Number: selectedServiceEntry.Vehicle_Number,
        Package: selectedServiceEntry.Package,
        selectedServices: selectedServiceEntry.selectedServices,
        cusID: selectedServiceEntry.cusID
      });
    } else {
      setBooking_Id(selectedBooking_Id);
      setVehicle_Number(''); 
      setPackage(''); 
      setSelectedServices('');
      setCusID('');
      
      setFormValues({
        ...formValues,
        Booking_Id: selectedBooking_Id,
        Vehicle_Number: '',
        Package: '',
        selectedServices: '',
        cusID: ''
      });
    }
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
            <label className='text-xl mr-4 text-gray-500'>Customer ID</label>
            <select
              name='cusID'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={formValues.cusID}
              onChange={handleServiceIdChange}
            >
              <option value=''>Select Customer ID</option>
              {Servicehistory.map((service) => (
                <option key={service._id} value={service.cusID}>
                  {service.cusID}
                </option>
              ))}
            </select>
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
              onChange={handleServiceIdChange}
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
            <label className='text-xl mr-4 text-gray-500'>Package</label>
            <select
              name='Package'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={formValues.Package}
              onChange={handleServiceIdChange}
            >
              <option value=''>Select Package</option>
              {Servicehistory.map((service) => (
                <option key={service._id} value={service.Package}>
                  {service.Package}
                </option>
              ))}
            </select>
            {formErrors.Package && <p className='text-red-500'>{formErrors.Package}</p>}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Service</label>
            <select
              name='selectedServices'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={formValues.selectedServices}
              onChange={handleServiceIdChange}
            >
              <option value=''>Select Service</option>
              {Servicehistory.map((service) => (
                <option key={service._id} value={service.selectedServices}>
                  {service.selectedServices}
                </option>
              ))}
            </select>
            {formErrors.selectedServices && <p className='text-red-500'>{formErrors.selectedServices}</p>}
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
            <label className='text-xl mr-4 text-gray-500'>Package Amount</label>
            <input
              type='number'
              name='Pamount'
              value={formValues.Pamount}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {/* {formErrors.totalAmount && <p className='text-red-500'>{formErrors.totalAmount}</p>} */}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Service Amount</label>
            <input
              type='number'
              name='Samount'
              value={formValues.Samount}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {/* {formErrors.totalAmount && <p className='text-red-500'>{formErrors.totalAmount}</p>} */}
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>totalAmount</label>
            <input
              type='number'
              name='totalAmount'
              value={totalAmount}
              readOnly // Make the input field read-only to prevent direct user input
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
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