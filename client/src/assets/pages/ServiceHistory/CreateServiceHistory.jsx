import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateServiceHistory = () => {

 const [Customer_Name,SetCustomer_Name] = useState('');
 const [Allocated_Employee,SetAllocated_Employee] = useState('');
 const [Vehicle_Number,SetVehicle_Number] = useState('');
 const [Service_History,SetService_History]=useState('');
 const [loading,SetLoading] = useState(false);
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  
  const data = {
    Customer_Name,
    Allocated_Employee,
    Vehicle_Number,
    Service_History
  };
  
  SetLoading(true);
  try {
    const response = await axios.post('http://localhost:8076/ServiceHistory/', data);
    SetLoading(false);
    navigate('/ServiceHistory'); // Navigate to the homepage after successful creation
  } catch (error) {
    SetLoading(false);
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
                    {loading? 'Updating...' : 'Update Service History'}
                </button>
             </div>





        </form>






    </div>




  );
};

export default CreateServiceHistory