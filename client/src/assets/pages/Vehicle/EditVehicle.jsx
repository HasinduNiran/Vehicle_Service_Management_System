import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditVehicle = () => {
  const [Register_Number, setRegister_Number] = useState('');
  const [Model, setModel] = useState('');
  const [Owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { Register_Number: id } = useParams(); // Use Register_Number as id

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/vehicles/${id}`)
      .then((response) => {
        setRegister_Number(response.data.Register_Number);
        setModel(response.data.Model);
        setOwner(response.data.Owner);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert('Error fetching vehicle. Please try again.');
      });
  }, [id]); // Use id as dependency

  const handleEditVehicle = async (e) => {
    e.preventDefault();
    const data = {
      Register_Number,
      Model,
      Owner
    };
    setLoading(true);
    try {
      await axios.put(`http://localhost:8076/vehicles/${id}`, data); // Use id in URL
      setLoading(false);
      navigate('/vehicle');
    } catch (error) {
      setLoading(false);
      console.error('Error updating vehicle:', error);
      alert('Error updating vehicle. Please try again.');
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Edit Vehicle</h1>
      </div>
      <form onSubmit={handleEditVehicle}>
        <div className='mt-4'>
          <label className='block'>Vehicle Number</label>
          <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Register_Number} onChange={(e) => setRegister_Number(e.target.value)} />
        </div>
        <div className='mt-4'>
          <label className='block'>Vehicle Model</label>
          <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className='mt-4'>
          <label className='block'>Vehicle Owner</label>
          <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Owner} onChange={(e) => setOwner(e.target.value)} />
        </div>
        <div className='mt-4'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            {loading ? 'Updating...' : 'Update Vehicle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicle;
