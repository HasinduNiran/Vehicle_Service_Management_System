
import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditFeedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [employee, setEmployee] = useState('');
    const [dateOfService, setDateOfService] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFeedbackData();
    }, []);

    const fetchFeedbackData = () => {
        setLoading(true);
        axios.get(`http://localhost:8076/vehicles/${id}`)
            .then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setPhoneNumber(response.data.phone_number);
                setEmployee(response.data.employee);
                setDateOfService(response.data.date_of_service);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An Error occurred. please check the console for more information')
                console.log(error);
            });
    };

    const handleSaveFeedback = () => {
        if (name && email && phoneNumber && employee && dateOfService && message) {
            const data = { name, email, phone_number: phoneNumber, employee, date_of_service: dateOfService, message };
            setLoading(true);
            axios.put(`http://localhost:8076/feedback/${id}`, data)
                .then(() => {
                    setLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    setLoading(false);
                    alert('An error occurred. Please check the console and try again');
                    console.log('Error updating Feedback:', error);
                });
        } else {
            alert('Please fill in all fields before submitting.');
        }
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>EditFeedback</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                {/* Other input fields go here */}
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveFeedback}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditFeedback;
