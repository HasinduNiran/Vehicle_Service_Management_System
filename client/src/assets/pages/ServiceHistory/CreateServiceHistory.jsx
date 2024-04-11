import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateServiceHistory = () => {
  const [cusID, setcusID] = useState('');
  const [Customer_Name, setCustomer_Name] = useState('');
  const [Allocated_Employee, setAllocated_Employee] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Milage, setMilage] = useState('');
  const [selectedPackage, setselectedPackage] = useState('');
  const [selectedServices, setselectedServices] = useState([]); 
  const [Booking_Id, setBooking_Id] = useState('');
  const [nextService, setNextService] = useState('');
  const [Service_History, setService_History] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [booking, setBookings] = useState([]);

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
    const selectBooking_Id = e.target.value;
    const selectedBooking = booking.find((booking) => booking.Booking_Id === selectBooking_Id);
  
    if (selectedBooking) {
      setcusID(selectedBooking.cusID);
      setCustomer_Name(selectedBooking.Customer_Name);
      setVehicle_Number(selectedBooking.Vehicle_Number);
      setselectedPackage(selectedBooking.selectedPackage);
      setselectedServices(selectedBooking.selectedServices || []);
    }
  
    setBooking_Id(selectBooking_Id);
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateVehicleNumber(Vehicle_Number)) {
    alert('Please enter a valid vehicle number.');
    return;
  }

  const data = {
    cusID,
    Customer_Name,
    Allocated_Employee,
    Vehicle_Number,
    Milage,
    Package:selectedPackage,
    Booking_Id,
    nextService,
    selectedServices,
    Service_History,
    Service_Date: selectedDate,
  };

  console.log('Request data:', data); // Added console log statement

  setLoading(true);
  try {
    await axios.post('http://localhost:8076/serviceHistory/', data);
    setLoading(false);
    navigate('/ServiceHistory');
  } catch (error) {
    setLoading(false);
    console.error('Error creating service history:', error);
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
      <form onSubmit={handleSubmit}>

    
      <div className='mt-4'>
          <label className='block'>Booking ID</label>
          <select
            className='border border-gray-600 rounded-md w-full p-2'
            value={Booking_Id}
            onChange={handleBookingIDChange}
          >
            <option value=''>Select a Booking ID</option>
            {booking.map((B) => (
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
            value={Customer_Name}
            disabled
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Allocated Employee</label>
          <select
            className='border border-gray-600 rounded-md w-full p-2'
            value={Allocated_Employee}
            onChange={(e) => setAllocated_Employee(e.target.value)}
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
            value={Vehicle_Number}
            disabled
          />
        </div>
        <div className='mt-4'>
          <label className='block'>Milage</label>
          <input
            type='number'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Milage}
            onChange={(e) => setMilage(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <label className='block'>selectedPackage</label>
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
            value={Service_History}
            onChange={(e) => setService_History(e.target.value)}
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
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            {loading ? 'Creating...' : 'Create Service History'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateServiceHistory;
