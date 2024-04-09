import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Spinner = () => {
    return <div>Loading...</div>;
};



const CreateBooking = () => {

    const [Booking_Date, setBooking_Date] = useState('');
    const [cussID, setcussID] = useState('');
    const [Customer_Name, setCustomer_Name] = useState('');
    const [Vehicle_Type, setVehicle_Type] = useState('');
    const [Vehicle_Number, setVehicle_Number] = useState('');
    const [Contact_Number, setContact_Number] = useState('');
    const [Email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { cusID } = useParams();
    const [packages, setPackages] = useState([]);
    const [Service, setService] = useState([]);

    const [selectedPackage, setSelectedPackage] = useState({
        pakgname: ''
      });

      //const [selectedService, setSelectedService] = useState({
        //Servicename: ''
      //});

      const [selectedService, setSelectedService] = useState([]); 

      useEffect(() => {
        setLoading(true);
        axios
          .get(`http://localhost:8076/Service`)
          .then((response) => {
            setService(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.message);
            setLoading(false);
          });
      }, []);
        
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8076/customer/${cusID}`)
            .then((response) => {
                const data = response.data;
                setcussID(data.cusID);

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert(`An error happened. Please check console`);
                console.log(error);
            });
    }, [cusID]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8076/Package`)
            .then((response) => {
                setPackages(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);


    const handlePackageChange = (e) => {
        setSelectedPackage(e.target.value);

      };
    
      const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedService([...selectedService, value]);
        } else {
            setSelectedService(selectedService.filter(service => service !== value));
        }
    };
    

    const handleSaveBooking = () => {




        const data = {
            Booking_Date,
            cusID,
            Customer_Name,
            Vehicle_Type,
            Vehicle_Number,
            Contact_Number,
            Email,
            selectedPackage,
            selectedService
        };

        setLoading(true);
        axios
            .post('http://localhost:8076/bookings', data)
            .then(() => {
                setLoading(false);
                navigate('/show-all');

            })
            .catch((error) => {

                setLoading(false);
                alert('An error happened. Please Check Console for more information');
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
                    <label className='text-xl mr-4 text-gray-500'>Package</label>

                    <select
                        value={selectedPackage.pakgname}
                        onChange={handlePackageChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        <option value=''>Select Package</option>
                        {packages.map((pkg) => (
                            <option key={pkg._id} value={pkg.pakgname}>
                                {pkg.pakgname}
                            </option>
                        ))}
                    </select>
                    </div>
                




                    <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Services</label>
                    {Service.map((serviceItem) => (
                        <div key={serviceItem._id} className='flex items-center'>
                            <input
                                type='checkbox'
                                id={serviceItem._id}
                                value={serviceItem.Servicename}
                                onChange={handleServiceChange}
                                checked={selectedService.includes(serviceItem.Servicename)}
                                className='custom-checkbox mr-2'
                            />
                            <label htmlFor={serviceItem._id}>{serviceItem.Servicename}</label>
                        </div>
                    ))}
                </div>
                    
                
                    {/*<div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Services</label>

                    <select
                        
                        value={selectedService.Servicename}
                        onChange={handleServiceChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        <option value=''>Select Package</option>
                        {Service.map((serviceItem) => (
                            <option key={serviceItem._id} value={serviceItem.Servicename}>
                                {serviceItem.Servicename}
                            </option>
                        ))}
                    </select>
                    </div>*/}




                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>customer-ID</label>
                    <input
                        type='text'
                        value={cussID}
                        onChange={(e) => setcussID(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Customer_Name</label>
                    <input
                        type='text'
                        value={Customer_Name}
                        onChange={(e) => setCustomer_Name(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Vehicle_Type</label>
                    <input
                        type='text'
                        value={Vehicle_Type}
                        onChange={(e) => setVehicle_Type(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Vehicle_Number</label>
                    <input
                        type='text'
                        value={Vehicle_Number}
                        onChange={(e) => setVehicle_Number(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Contact_Number</label>
                    <input
                        type='text'
                        value={Contact_Number}
                        onChange={(e) => setContact_Number(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
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


export default CreateBooking;