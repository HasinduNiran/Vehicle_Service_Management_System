import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateServiceHistory = () => {
  const [Customer_Name, setCustomer_Name] = useState('');
  const [Allocated_Employee, setAllocated_Employee] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Service_History, setService_History] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      Customer_Name,
      Allocated_Employee,
      Vehicle_Number,
      Service_History,
      Service_Date: selectedDate,
    };

    setLoading(true);
    try {
      await axios.post('http://localhost:8076/ServiceHistory/', data);
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
        <div className='mt-4'>
          <label className='block'>Customer Name</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Customer_Name}
            onChange={(e) => setCustomer_Name(e.target.value)}
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
              <option key={employee._id} value={employee.employeeName}>
                {employee.employeeName}
              </option>
            ))}
          </select>
        </div>

        <div className='mt-4'>
          <label className='block'>Vehicle Number</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Vehicle_Number}
            onChange={(e) => setVehicle_Number(e.target.value)}
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
