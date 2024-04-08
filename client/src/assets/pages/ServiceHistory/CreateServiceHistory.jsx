import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateServiceHistory = () => {
  const [Customer_Name, setCustomer_Name] = useState('');
  const [Allocated_Employee, setAllocated_Employee] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Milage, setMilage] = useState('');
  const [Package, setPackage] = useState('');
  const [Booking_Id, setBooking_Id] = useState('');
  const [nextService, setNextService] = useState('');
  const [Service_History, setService_History] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]); 
  const [employees, setEmployees] = useState([]); 

  const navigate = useNavigate();

  // Validation function for Vehicle Number
  const validateVehicleNumber = (value) => {
    // Regular expression for alphanumeric with hyphen and space
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    // Check if the value matches the pattern
    return regex.test(value);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/customer')
      .then((response) => {
        setCustomers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    axios
      .get('http://localhost:8076/employees')
      .then((response) => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    axios
      .get('http://localhost:8076/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(Vehicle_Number)) {
      alert('Please enter a valid vehicle number.');
      return;
    }

    const data = {
      Customer_Name,
      Allocated_Employee,
      Vehicle_Number,
      Milage,
      Package,
      Booking_Id,
      nextService,
      Service_History,
      Service_Date: selectedDate,
    };

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

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Create Service History</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Customer Name */}
        <div className='mt-4'>
          <label className='block'>Customer Name</label>
          <select
            className='border border-gray-600 rounded-md w-full p-2'
            value={Customer_Name}
            onChange={(e) => setCustomer_Name(e.target.value)}
          >
            <option value=''>Select a customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer.Customer_Name}>
                {customer.username}
              </option>
            ))}
          </select>
        </div>

        {/* Allocated Employee */}
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

        {/* Vehicle Number */}
        <div className='mt-4'>
          <label className='block'>Vehicle Number</label>
          <select
            className='border border-gray-600 rounded-md w-full p-2'
            value={Vehicle_Number}
            onChange={(e) => setVehicle_Number(e.target.value)}
          >
            <option value=''>Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.Vehicle_Number}>
                {vehicle.Register_Number}
              </option>
            ))}
          </select>
        </div>

        {/* Milage */}
        <div className='mt-4'>
          <label className='block'>Milage</label>
          <input
            type='number'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Milage}
            onChange={(e) => setMilage(e.target.value)}
          />
        </div>

        {/* Package */}
        <div className='mt-4'>
          <label className='block'>Package</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Package}
            onChange={(e) => setPackage(e.target.value)}
          />
        </div>

        {/* Booking ID */}
        <div className='mt-4'>
          <label className='block'>Booking ID</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Booking_Id}
            onChange={(e) => setBooking_Id(e.target.value)}
          />
        </div>

        {/* Next Service */}
        <div className='mt-4'>
          <label className='block'>Next Service</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={nextService}
            onChange={(e) => setNextService(e.target.value)}
          />
        </div>

        {/* Service History */}
        <div className='mt-4'>
          <label className='block'>Service History</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Service_History}
            onChange={(e) => setService_History(e.target.value)}
          />
        </div>

        {/* Service Date */}
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

        {/* Submit Button */}
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
