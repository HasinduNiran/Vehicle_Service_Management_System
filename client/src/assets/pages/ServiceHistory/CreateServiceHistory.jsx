import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateServiceHistory = () => {
  const [Customer_Name, SetCustomer_Name] = useState('');
  const [Allocated_Employee, SetAllocated_Employee] = useState('');
  const [Vehicle_Number, SetVehicle_Number] = useState('');
  const [Service_History, SetService_History] = useState('');
  const [Service_Date, SetService_Date] = useState('');

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
    e.preventDefault(); // Prevent the default form submission behavior

    const data = {
      Customer_Name,
      Allocated_Employee,
      Vehicle_Number,
      Service_History,
      Service_Date: new Date().toISOString(), // Add the current date and time
    };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8076/ServiceHistory/', data);
      setLoading(false);
      navigate('/ServiceHistory'); // Navigate to the homepage after successful creation
    } catch (error) {
      setLoading(false);
      console.error('Error creating service history:', error);
      alert('Error creating service history. Please try again.'); // Display a generic error message
    }
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
            onChange={(e) => SetCustomer_Name(e.target.value)}
          />
        </div>

        <div className='mt-4'>
          <label className='block'>Allocated Employee</label>
          <select
            className='border border-gray-600 rounded-md w-full p-2'
            value={Allocated_Employee}
            onChange={(e) => SetAllocated_Employee(e.target.value)}
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
            onChange={(e) => SetVehicle_Number(e.target.value)}
          />
        </div>

        <div className='mt-4'>
          <label className='block'>Service History</label>
          <input
            type='text'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Service_History}
            onChange={(e) => SetService_History(e.target.value)}
          />
        </div>

        
        <div className='mt-4'>
          <label className='block'>Service_Date</label>
          <input
            type='date'
            className='border border-gray-600 rounded-md w-full p-2'
            value={Service_Date}
            onChange={(e) => SetService_Date(e.target.value)}
          />
        </div>





        <div className='mt-4'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            {loading ? 'Updating...' : 'Create Service History'}
          </button>
        </div>





      </form>






    </div>




  );
};

export default CreateServiceHistory