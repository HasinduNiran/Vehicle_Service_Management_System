import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const CreateBooking = () => {

const [Customer_Name, setCustomer_Name] = useState('');
const [Vehicle_Type, setVehicle_Type] = useState('');
const [Vehicle_Number, setVehicle_Number] = useState('');
const [Contact_Number, setContact_Number] = useState('');
const [Email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const handleSaveBooking = () => {

const data = {

    Customer_Name,
    Vehicle_Type,
    Vehicle_Number,
    Contact_Number,
    Email

};

setLoading(true);
axios
 .post('http://localhost:8076/bookings', data)
 .then( () => { 
    setLoading(false);
    navigate('/show-all');

 })
 .catch((error) => {

  setLoading(false);
  alert('An error happened. Please Check Console for more information');
  console.log(error);

 });


};




    return (
        <div className='p-4'>
            
            <h1 className='text-3xl my-4'>CreateBooking</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2  border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Customer_Name</label>
                    <input
                        type='text'
                        value={Customer_Name}
                        onChange={(e) => setCustomer_Name(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                </div>
                <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Vehicle_Type</label>
                    <input
                        type='text'
                        value={Vehicle_Type}
                        onChange={(e) => setVehicle_Type(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                </div>
                <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Vehicle_Number</label>
                    <input
                        type='text'
                        value={Vehicle_Number}
                        onChange={(e) => setVehicle_Number(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                </div>
                <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Contact_Number</label>
                    <input
                        type='text'
                        value={Contact_Number}
                        onChange={(e) => setContact_Number(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                </div>
                <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Email</label>
                    <input
                        type='text'
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
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


export default CreateBooking