import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
    return <div>Loading...</div>;
};



const addBookingLimit = () => {

    const [Booking_Date, setBooking_Date] = useState('');
    const [Bookinglimit, setBookinglimit] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    

    const handleSaveBooking = () => {

    if (!Booking_Date || !Bookinglimit) {
        alert("All fields are required.");
        return;
    }
        

        const data = {
            Booking_Date,
            Bookinglimit
            
        };

        setLoading(true);
        axios
            .post('http://localhost:8076/bookingLimits', data)
            .then(() => {
                setLoading(false);
                navigate('/show-all');

            })
            .catch((error) => {
                 
                setLoading(false);
                alert('An error happened. Please Check Console for more informationnnn');
                console.log(error);

            });


    };

    const today = new Date().toISOString().split('T')[0];


    return (
        <div className='p-4'>

            <h1 className='text-3xl my-4'>CreateBooking</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2  border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>


                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Select Date</label>
                    <input
                        type='date'
                        value={Booking_Date}
                        onChange={(e) => setBooking_Date(e.target.value)}
                        min={today}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>customer-ID</label>
                    <input
                        type='Number'
                        value={Bookinglimit}
                        onChange={(e) => setBookinglimit(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBooking}>
                    Save
                </button>
            </div>
        </div>
    )
}


export default addBookingLimit;