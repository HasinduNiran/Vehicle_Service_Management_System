import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditVehicle = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [Register_Number, setRegister_Number] = useState('');
  const [Make, setMake] = useState('');
  const [Model, setModel] = useState('');
  const [Year, setYear] = useState('');
  const [Engine_Details, setEngine_Details] = useState('');
  const [Transmission_Details, setTransmission_Details] = useState('');
  const [Vehicle_Color, setVehicle_Color] = useState('');
  const [Vehicle_Features, setVehicle_Features] = useState('');
  const [Condition_Assessment, setCondition_Assessment] = useState('');
  const [Owner, setOwner] = useState('');


      // Validation function for Vehicle Number
      const validateVehicleNumber = (value) => {
        // Regular expression for alphanumeric with hyphen and space
        const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
        // Check if the value matches the pattern
        if (!value.match(regex)) {
            return false; // Return false if validation fails
        }
        return true; // Return true if validation passes
    };

  
  // Year set
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, index) => currentYear - index);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/vehicles/${id}`)
      .then((response) => {
        setRegister_Number(response.data.Register_Number);
        setMake(response.data.Make);
        setModel(response.data.Model);
        setYear(response.data.Year);
        setEngine_Details(response.data.Engine_Details);
        setTransmission_Details(response.data.Transmission_Details);
        setVehicle_Color(response.data.Vehicle_Color);
        setVehicle_Features(response.data.Vehicle_Features);
        setCondition_Assessment(response.data.Condition_Assessment);
        setOwner(response.data.Owner);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert('Error fetching vehicle. Please try again.');
      });
  }, [id]); // Add id as a dependency

  const handleEditVehicle = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(Register_Number)) {
      alert('Please enter a valid vehicle number.'); // Display an error message if validation fails
      return; // Exit the function if validation fails
  }
    const data = {
      Register_Number,
      Make,
      Model,
      Year,
      Engine_Details,
      Transmission_Details,
      Vehicle_Color,
      Vehicle_Features,
      Condition_Assessment,  
      Owner
    };
    setLoading(true);
    try {
      await axios.put(`http://localhost:8076/vehicles/${id}`, data);
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
          <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Register_Number} onChange={(e) => setRegister_Number(e.target.value)}maxLength={8} />
        </div>
        <div className='mt-4'>
          <label className='block'>Make</label>
          <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Make} onChange={(e) => setMake(e.target.value)} />
        </div>
        <div className='mt-4'>
          <label className='block'>Model</label>
          <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className='mt-4'>
          <label className='block'>Select Year</label>
          <select className='border border-gray-600 rounded-md w-full p-2' value={Year} onChange={(e) => setYear(e.target.value)}>
            <option value=''>Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className='mt-4'>
          <label className='block'>Engine Details</label>
          <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Engine_Details} onChange={(e) => setEngine_Details(e.target.value)} />
        </div>
                <div className='mt-4'>
                    <label className='block'>Transmission Details</label>
                    <select className='border border-gray-600 rounded-md w-full p-2' value={Transmission_Details} onChange={(e) => setTransmission_Details(e.target.value)}>
                        <option value=''>Select Transmission</option>
                        <option value='Automatic'>Automatic</option>
                        <option value='Manual'>Manual</option>
                    </select>
                </div>
                <div className='mt-4'>
                    <label className='block'>Vehicle Color</label>
                    <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Vehicle_Color} onChange={(e) => setVehicle_Color(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Vehicle Features</label>
                    <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Vehicle_Features} onChange={(e) => setVehicle_Features(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Condition Assessment</label>
                    <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Condition_Assessment} onChange={(e) => setCondition_Assessment(e.target.value)} />
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
