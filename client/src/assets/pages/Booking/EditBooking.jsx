import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';


export default function EditBooking ()  {

const [Customer_Name, setCustomer_Name] = useState('');
const [Vehicle_Type, setVehicle_Type] = useState('');
const [Vehicle_Number, setVehicle_Number] = useState('');
const [Contact_Number, setContact_Number] = useState('');
const [Email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [Booking_Id, setBooking_Id] = useState('');
const [selectedPackage, setselectedPackage] = useState('');
const [selectedServices, setSelectedServices] = useState('');
const [services, setServices] = useState([]);

const navigate = useNavigate();
const {id} = useParams();
useEffect(() => {
  setLoading(true);

  axios.get(`http://localhost:8076/bookings/${id}`)

  .then((response) => {

    setCustomer_Name(response.data.Customer_Name);
    setVehicle_Type(response.data.Vehicle_Type);
    setVehicle_Number(response.data.Vehicle_Number);
    setContact_Number(response.data.Contact_Number);
    setEmail(response.data.Email);
    setBooking_Id(response.data.Booking_Id);
    setselectedPackage(response.data.selectedPackage);
    setSelectedServices(response.data.selectedServices);
    setLoading(false);


  }).catch((error) => {

    setLoading(false);
    alert('An error happened. Please check console');
    console.log(error);
  });
}, [id]);



useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/service')
        .then((response) => {
            setServices(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching services:', error);
            setLoading(false);
        });
}, []);

const handleServiceSelect = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
        setSelectedServices(selectedServices.filter(service => service !== serviceName));
    } else {
        setSelectedServices([...selectedServices, serviceName]);
    }
};

const handleSaveBooking = () => {
const data =  {

    Customer_Name,
    Vehicle_Type,
    Vehicle_Number,
    Contact_Number,
    Email,
    selectedServices
    

};

setLoading(true);
axios.put(`http://localhost:8076/bookings/${id}`, data)
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
            
            <h1 className='text-3xl my-4'>EditBooking</h1>
            {/*loading ? <p>Loading...</p> : ''*/}
            <div className='flex flex-col border-2  border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Booking-ID</label>
                    <input
                        type='text'
                        value={Booking_Id}
                        readOnly
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                </div>
                <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Package</label>
                    <input
                        type='text'
                        value={selectedPackage}
                        readOnly
                        //onChange={(e) => setVehicle_Type(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Services</label>
                    <div className="flex flex-wrap">
                        {services.map(service => (
                            <button
                                key={service._id}
                                className={`bg-gray-200 mr-2 mb-2 px-4 py-2 rounded ${selectedServices.includes(service.Servicename) ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleServiceSelect(service.Servicename)}
                                
                            >
                                {service.Servicename}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='my-4'>
                    <label className= 'text-xl mr-4 text-gray-500'>Customer_Name</label>
                    <input
                        type='text'
                        value={Customer_Name || ""}
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

