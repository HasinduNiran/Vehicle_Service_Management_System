import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateVehicle = () => {
    const [Register_Number, setRegister_Number] = useState('');
    const [Model, setModel] = useState('');
    const [Owner, setOwner] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const data = {
            Register_Number,
            Model,
            Owner
        };

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8076/vehicles', data);
            setLoading(false);
            navigate('/vehicle'); // Navigate to the homepage after successful creation
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
            <form onSubmit={handleSubmit}> {/* Use a form element and onSubmit handler */}
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
                        {loading ? 'Creating...' : 'Create Vehicle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVehicle;
