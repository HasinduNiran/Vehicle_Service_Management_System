import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateServiceHistory = () => {
  const [cusID, setCusID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [allocatedEmployee, setAllocatedEmployee] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [milage, setMilage] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingId, setBookingId] = useState('');
  const [nextService, setNextService] = useState('');
  const [serviceHistory, setServiceHistory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();
  const { id: bookingID } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.all([
      axios.get('http://localhost:8076/employees'),
      axios.get('http://localhost:8076/bookings')
    ])
      .then(axios.spread((employeesRes, bookingsRes) => {
        setEmployees(employeesRes.data.data);
        setBookings(bookingsRes.data);
        setLoading(false);
      }))
      .catch(error => {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      });
  }, []);

  const handleBookingIDChange = (e) => {
    const selectedBookingId = e.target.value;
    const selectedBooking = bookings.find((booking) => booking.Booking_Id === selectedBookingId);

    if (selectedBooking) {
      setCusID(selectedBooking.cusID);
      setCustomerName(selectedBooking.Customer_Name);
      setVehicleNumber(selectedBooking.Vehicle_Number);
      setSelectedPackage(selectedBooking.selectedPackage);
      setSelectedServices(selectedBooking.selectedServices || []);
    }

    setBookingId(selectedBookingId);
  };

  const handleServiceSelect = (serviceName) => {
    const isServiceSelected = selectedServices.includes(serviceName);
    let updatedSelectedServices;
  
    if (isServiceSelected) {
      // If the service is already selected, remove it from the list
      updatedSelectedServices = selectedServices.filter(service => service !== serviceName);
    } else {
      // If the service is not selected, add it to the list
      updatedSelectedServices = [...selectedServices, serviceName];
    }
  
    setSelectedServices(updatedSelectedServices);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(vehicleNumber)) {
      alert('Please enter a valid vehicle number.');
      return;
    }

    const data = {
      cusID,
      Customer_Name: customerName,
      Allocated_Employee: allocatedEmployee,
      Vehicle_Number: vehicleNumber,
      Milage: milage,
      Package: selectedPackage,
      Booking_Id: bookingId,
      nextService,
      selectedServices,
      Service_History: serviceHistory,
      Service_Date: selectedDate,
    };

    console.log('Request data:', data);

    setLoading(true);
    try {
      await axios.post('http://localhost:8076/serviceHistory/', data);
      setLoading(false);
      navigate('/ServiceHistory');
    } catch (error) {
      setLoading(false);
      console.error('Error creating service history:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      alert('Error creating service history. Please try again.');
    }
  };

  const validateVehicleNumber = (value) => {
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    return regex.test(value);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/service')
      .then((response) => {
        setServices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Create Service History</h1>
      </div>
      <div>
        <div className='mt-4'>
          <label className='block'>Booking ID</label>
          <select
            className='border border-gray-600 rounded-md w-full p-2'
            value={bookingId}
            onChange={handleBookingIDChange}
          >
            <option value=''>Select a Booking ID</option>
            {bookings.map((B) => (
              <option key={B._id} value={B.Booking_Id}>
                {B.Booking_Id}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-4'>
          <label className='block'>Customer ID</label>
          <input
            className='border border-gray-600 rounded-md w-full p-2'
            value={cusID}
            disabled
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Customer Name</label>
          <input
            className='border border-gray-600 rounded-md w-full p-2'
            value={customerName}
            disabled
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Allocated Employee</label>
          <select
            className='border border-gray-600 rounded-md w-full p-2'
            value={allocatedEmployee}
            onChange={(e) => setAllocatedEmployee(e.target.value)}
          >
            <option value=''>Select an employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee.Allocated_Employee}>
                {employee.employeeName}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-4'>
          <label className='block'>Vehicle Number</label>
          <input
            className='border border-gray-600 rounded-md w-full p-2'
            value={vehicleNumber}
            disabled
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Milage</label>
          <input
            type='number'
            className='border border-gray-600 rounded-md w-full p-2'
            value={milage}
            onChange={(e) => setMilage(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Selected Package</label>
          <input
            className='border border-gray-600 rounded-md w-full p-2'
            value={selectedPackage}
            disabled
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Selected Services</label>
          <input
            className='border border-gray-600 rounded-md w-full p-2'
            value={selectedServices.join(', ')}
          />
          <div className="flex flex-wrap">
            {services.map(service => (
              <button
                key={service._id}
                type="button" // Prevents form submission
                className={`bg-gray-200 mr-2 mb-2 px-4 py-2 rounded ${selectedServices.includes(service.Servicename) ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleServiceSelect(service.Servicename)}
              >
                {service.Servicename}
              </button>
            ))}
          </div>
        </div>
        <div className='mt-4'>
          <label className='block'>Next Service</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={nextService}
            onChange={(e) => setNextService(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Service History</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={serviceHistory}
            onChange={(e) => setServiceHistory(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Service Date</label>
          <input
            type='date'
            className='border border-gray-600 rounded-md w-full p-2'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={getTodayDate()}
          />
        </div>
        <div className='mt-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleSubmit}
          >
            {loading ? 'Creating...' : 'Create Service History'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceHistory;
