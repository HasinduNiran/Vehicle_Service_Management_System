import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateVehicle = () => {
    const [Register_Number, setRegister_Number] = useState('');
    const [Make, setMake] = useState('');
    const [Model, setModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [Engine_Details, setEngine_Details] = useState('');
    const [Transmission_Details, setTransmission_Details] = useState('');
    const [Vehicle_Color, setVehicle_Color] = useState('');
    const [Vehicle_Features, setVehicle_Features] = useState('');
    const [Condition_Assessment, setCondition_Assessment] = useState('');
    const [Owner, setOwner] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const data = {
            Register_Number,
            Make,
            Model,
            Year: selectedYear,
            Engine_Details,
            Transmission_Details,
            Vehicle_Color,
            Vehicle_Features,
            Condition_Assessment,
            Owner
        };

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8076/vehicles', data);
            setLoading(false);
            if (response.status === 201) {
                alert('Vehicle created successfully.'); // Show success message
                navigate('/vehicle'); // Navigate to the vehicle page after successful creation
            } else {
                throw new Error('Failed to create vehicle.'); // Throw error if response status is not 201
            }
        } catch (error) {
            setLoading(false);
            console.error('Error creating vehicle:', error);
            alert('Error creating vehicle. Please try again.'); // Display a generic error message
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Create Vehicle</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mt-4'>
                    <label className='block'>Vehicle Number</label>
                    <input type='text' className='border border-gray-600 rounded-md w-full p-2' value={Register_Number} onChange={(e) => setRegister_Number(e.target.value)} />
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
                    <select className='border border-gray-600 rounded-md w-full p-2' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value=''>Select Year</option>
                        {[...Array(40)].map((_, index) => {
                            const year = new Date().getFullYear() - index;
                            return <option key={year} value={year}>{year}</option>;
                        })}
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
                        {loading ? 'Creating...' : 'Create Vehicle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVehicle;
