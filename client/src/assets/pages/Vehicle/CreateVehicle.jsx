import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'

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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!validateVehicleNumber(Register_Number)) {
            alert('Please enter a valid vehicle number.'); // Display an error message if validation fails
            return; // Exit the function if validation fails
        }

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
        <div >
            <div className='form-container'>
                
                <h1 className='title' >Create Vehicle</h1>
           
            <form onSubmit={handleSubmit} className='form' >
                <div className='mt-4'>
                    <label className='block'>Vehicle Number</label>
                    <input type='text' className='text-box' value={Register_Number} onChange={(e) => setRegister_Number(e.target.value)} maxLength={8}/>
                </div>
                <div className='mt-4'>
                    <label className='block'>Make</label>
                    <input type='text' className='text-box' value={Make} onChange={(e) => setMake(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Model</label>
                    <input type='text' className='text-box' value={Model} onChange={(e) => setModel(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Select Year</label>
                    <select className='text-box' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value=''>Select Year</option>
                        {[...Array(40)].map((_, index) => {
                            const year = new Date().getFullYear() - index;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                </div>
                <div className='mt-4'>
                    <label className='block'>Engine Details</label>
                    <input type='text' className='text-box' value={Engine_Details} onChange={(e) => setEngine_Details(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Transmission Details</label>
                    <select className='text-box' value={Transmission_Details} onChange={(e) => setTransmission_Details(e.target.value)}>
                        <option value=''>Select Transmission</option>
                        <option value='Automatic'>Automatic</option>
                        <option value='Manual'>Manual</option>
                    </select>
                </div>
                <div className='mt-4'>
                    <label className='block'>Vehicle Color</label>
                    <input type='text' className='text-box' value={Vehicle_Color} onChange={(e) => setVehicle_Color(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Vehicle Features</label>
                    <input type='text' className='text-box' value={Vehicle_Features} onChange={(e) => setVehicle_Features(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Condition Assessment</label>
                    <input type='text' className='text-box' value={Condition_Assessment} onChange={(e) => setCondition_Assessment(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <label className='block'>Vehicle Owner</label>
                    <input type='text' className='text-box' value={Owner} onChange={(e) => setOwner(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <button type='submit' className='create'>
                        {loading ? 'Creating...' : 'Create Vehicle'}
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default CreateVehicle;
