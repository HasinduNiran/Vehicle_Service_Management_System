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
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8076/customer/${cusID}`)
            .then((response) => {
                const data = response.data;
                setcussID(data.cusID);
                setContact_Number(data.phone);
                setEmail(data.email);
                setCustomer_Name(`${data.firstName} ${data.lastName}`);
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
        // Make API call with selected value if needed
    };

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
        if (!Booking_Date || !cusID || !Customer_Name || !Vehicle_Type || !Vehicle_Number || !Contact_Number || !Email || !selectedPackage && selectedServices.length === 0) {
            alert("All fields are required.");
            return;
        }

        const data = {
            Booking_Date,
            cusID,
            Customer_Name,
            Vehicle_Type,
            Vehicle_Number,
            Contact_Number,
            Email,
            selectedPackage,
            selectedServices
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)', maxWidth: '600px', width: '100%', boxSizing: 'border-box' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Create Booking</h1>
                {loading ? <Spinner /> : ''}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Select Date</label>
                        <input
                            type='date'
                            value={Booking_Date}
                            onChange={(e) => setBooking_Date(e.target.value)}
                            min={today}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Package</label>
                        <select
                            value={selectedPackage}
                            onChange={handlePackageChange}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        >
                            <option value=''>Select Package</option>
                            {packages.map((pkg) => (
                                <option key={pkg._id} value={pkg.pakgname}>
                                    {pkg.pakgname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Includes</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {services.map((service) => (
                                <button
                                    key={service._id}
                                    onClick={() => handleServiceSelect(service.Servicename)}
                                    style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: selectedServices.includes(service.Servicename) ? '#007bff' : '#fff', color: selectedServices.includes(service.Servicename) ? '#fff' : '#333', cursor: 'pointer' }}
                                >
                                    {service.Servicename}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Customer ID</label>
                        <input
                            type='text'
                            value={cussID}
                            onChange={(e) => setcussID(e.target.value)}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Customer Name</label>
                        <input
                            type='text'
                            value={Customer_Name}
                            onChange={(e) => setCustomer_Name(e.target.value)}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Vehicle Type</label>
                        <input
                            type='text'
                            value={Vehicle_Type}
                            onChange={(e) => setVehicle_Type(e.target.value)}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Vehicle Number</label>
                        <input
                            type='text'
                            value={Vehicle_Number}
                            onChange={(e) => setVehicle_Number(e.target.value)}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Contact Number</label>
                        <input
                            type='text'
                            value={Contact_Number}
                            onChange={(e) => setContact_Number(e.target.value)}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '1.2rem', marginRight: '10px', color: '#333' }}>Email</label>
                        <input
                            type='text'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <button onClick={handleSaveBooking} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' }}>Save Booking</button>
                </div>
            </div>
        </div>
    );
};

export default CreateBooking;
