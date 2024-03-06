import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditServiceHistory = () => {


  const [Customer_Name, SetCustomer_Name] = useState('');
  const [Allocated_Employee, SetAllocated_Employee] = useState('');
  const [Vehicle_Number, SetVehicle_Number] = useState('');
  const [Service_History, SetService_History] = useState('');
  const [loading, SetLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); // Add this line to import and assign useNavigate

  useEffect(() => {
    SetLoading(true); // Fix the typo in setLoading
    axios.get(`http://localhost:8076/servicehistory/${id}`)
      .then((response) => {
        const { Customer_Name, Allocated_Employee, Vehicle_Number, Service_History } = response.data;
        SetCustomer_Name(Customer_Name);
        SetAllocated_Employee(Allocated_Employee);
        SetVehicle_Number(Vehicle_Number);
        SetService_History(Service_History);
        SetLoading(false);
      })
      .catch((error) => {
        SetLoading(false);
        console.log(error);
        alert('Error fetching vehicle. Please try again.');
      });
  }, [id]); // Add id as a dependency

  const handleEditservice = async (e) => {

    e.preventDefault();
    const data = {
      Customer_Name,
      Allocated_Employee,
      Vehicle_Number,
      Service_History
    };
    SetLoading(true);
    try {
      await axios.put(`http://localhost:8076/ServiceHistory/${id}`, data); // Fix the URL with backticks
      SetLoading(false);
      navigate('/ServiceHistory'); // Use navigate to navigate to the desired route
    } catch (error) {
      SetLoading(false);
      console.error('Error updating vehicle:', error);
      alert('Error updating vehicle. Please try again.');
    }
  };


  return (
    
    <div className='flex justify-center items-center h-screen'>
   
      <div className='w-1/2'>
        <form onSubmit={handleEditservice} className='justify-between items-center'>
          <div className='mt-4'>
            <label className='block'>Customer Name</label>
            <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Customer_Name} onChange={(e) => SetCustomer_Name(e.target.value)} />
          </div>
          <div className='mt-4'>
            <label className='block'>Allocated Employee</label>
            <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Allocated_Employee} onChange={(e) => SetAllocated_Employee(e.target.value)} />
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
