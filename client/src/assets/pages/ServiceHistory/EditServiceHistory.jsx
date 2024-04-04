import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditServiceHistory = () => {
  const [Customer_Name, setCustomer_Name] = useState('');
  const [Allocated_Employee, setAllocated_Employee] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Service_History, setService_History] = useState('');
  const [Service_Date, setService_Date] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);


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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/ServiceHistory/${id}`) // Correct the URL with backticks and use `ServiceHistory` instead of `servicehistory`
      .then((response) => {
        const { Customer_Name, Allocated_Employee, Vehicle_Number, Service_History, Service_Date } = response.data;
        setCustomer_Name(Customer_Name);
        setAllocated_Employee(Allocated_Employee);
        setVehicle_Number(Vehicle_Number);
        setService_History(Service_History);
        setService_Date(Service_Date);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert('Error fetching service history. Please try again.'); // Update the error message
      });
  }, [id]);

  const handleEditService = async (e) => { // Change handleEditservice to handleEditService
    e.preventDefault();
    const data = {
      Customer_Name,
      Allocated_Employee,
      Vehicle_Number,
      Service_History,
      Service_Date
    };
    setLoading(true);
    try {
      await axios.put(`http://localhost:8076/ServiceHistory/${id}`, data);
      setLoading(false);
      navigate('/ServiceHistory');
    } catch (error) {
      setLoading(false);
      console.error('Error updating service history:', error);
      alert('Error updating service history. Please try again.'); // Update the error message
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-1/2'>
        <form onSubmit={handleEditService}> {/* Correct the onSubmit function name */}
          <div className='mt-4'>
            <label className='block'>Customer Name</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Customer_Name}
              onChange={(e) => setCustomer_Name(e.target.value)} // Update the setter function name
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Allocated Employee</label>
            <select
              className='border border-gray-600 rounded-md w-full p-2'
              value={Allocated_Employee}
              onChange={(e) => setAllocated_Employee(e.target.value)} // Update the setter function name
            >
              <option value=''>Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.employeeName}> {/* Use employee.name as the value */}
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-4'>
            <label className='block'>Vehicle Number</label>
            <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Vehicle_Number} onChange={(e) => SetVehicle_Number(e.target.value)} />
          </div>
          <div className='mt-4'>
            <label className='block'>Service History</label>
            <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Service_History} onChange={(e) => SetService_History(e.target.value)} />
          </div>
          <div className='mt-4'>
            <label className='block'>Service Date</label>
            <input
              type='date'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Service_Date}
              onChange={(e) => setService_Date(e.target.value)}
              max={new Date().toISOString().split('T')[0]} // Set the max attribute to today's date
            />
          </div>

          <div className='mt-4'>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              {loading ? 'Updating...' : 'Update Service History'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceHistory
