import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';
import Spinner from '../../components/Spinner';

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
        if (!validateVehicleNumber(Vehicle_Number)) {
            alert('Please enter a valid vehicle number.'); // Display an error message if validation fails
            return; // Exit the function if validation fails
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
                alert('Your Booking is successfull');
                navigate('/customer/get/${cusID}');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check Console for more information');
                console.log(error);
            });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Create Booking </h1>
                <div style={styles.underline}></div>
                {loading ? <Spinner /> : ''}
                <div style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Select Date</label>
                        <input
                            type='date'
                            value={Booking_Date}
                            onChange={(e) => setBooking_Date(e.target.value)}
                            min={today}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Package</label>
                        <select
                            value={selectedPackage}
                            onChange={handlePackageChange}
                            style={styles.input}
                        >
                            <option value=''>Select Package</option>
                            {packages.map((pkg) => (
                                <option key={pkg._id} value={pkg.pakgname}>
                                    {pkg.pakgname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Includes</label>
                        <div style={styles.servicesContainer}>
                            {services.map((service) => (
                                <button
                                    key={service._id}
                                    onClick={() => handleServiceSelect(service.Servicename)}
                                    style={{ ...styles.serviceButton, ...(selectedServices.includes(service.Servicename) && { backgroundColor: 'red', color: 'white' }) }}
                                >
                                    {service.Servicename}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer ID</label>
                        <input
                            type='text'
                            value={cussID}
                            onChange={(e) => setcussID(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer Name</label>
                        <input
                            type='text'
                            value={Customer_Name}
                            onChange={(e) => setCustomer_Name(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Vehicle Type</label>
                        <select
                            value={Vehicle_Type}
                            onChange={(e) => setVehicle_Type(e.target.value)}
                            style={styles.input}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="Van">Van</option>
                            <option value="Car">Car</option>
                            <option value="Bus">Bus</option>
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Vehicle Number</label>
                        <input
                            type='text'
                            value={Vehicle_Number}
                            onChange={(e) => setVehicle_Number(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Contact Number</label>
                        <input
                            type='text'
                            value={Contact_Number}
                            onChange={(e) => setContact_Number(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type='text'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button onClick={handleSaveBooking} style={styles.button}>Save Booking</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    formContainer: {
        width: '50%',
        backgroundColor: 'rgba(5, 4, 2, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
        padding: '20px',
        border: '2px solid red', // Add a red border
        borderColor: 'red',
        margin: '10px',
        textAlign: 'center',
        position: 'relative', // Add this line for absolute positioning of the line
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '10px',
    },
    heading: {
        fontSize: '3rem',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
    },
    inputGroup: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: 'black',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        flexDirection: 'column',
        fontSize: '1.2rem',
        color: 'red',
        textAlign: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        display: 'block',
        textTransform: 'uppercase',
    },
    input: {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
        color: 'black',
    },
    servicesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    serviceButton: {
        backgroundColor: '#e0e0e0',
        color: '#333',
        border: 'none',
        borderRadius: '0.25rem',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
        display: 'flex',
    },
    button: {
        backgroundColor: 'red',
        color: '#fff',
        border: 'none',
        borderRadius: '0.25rem',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default CreateBooking;
