import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';
import Spinner from '../../components/Spinner';


const AdminCreateBooking = () => {
    const [bookings, setBookings] = useState([]);
    //const [bookinglimits, setBookinglimits] = useState([]);
    const [maxBookingLimit, setMaxBookingLimit] = useState('');
    
    const [Booking_Date, setBooking_Date] = useState('');
    const [bookingCount, setBookingCount] = useState('');
    const [Customer_Name, setCustomer_Name] = useState('');
    const [Vehicle_Type, setVehicle_Type] = useState('');
    const [Vehicle_Number, setVehicle_Number] = useState('');
    const [Contact_Number, setContact_Number] = useState('');
    const [Email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');

    const calculateBookingCount = () => {
        // Format the selected date to match the format in the database
        const formattedSelectedDate = new Date(Booking_Date).toISOString();
    
        // Filter bookings based on the formatted selected date
        const selectedDateBookings = bookings.filter(booking => {
            // Format each booking date to match the format in the database
            const formattedBookingDate = new Date(booking.Booking_Date).toISOString();
            // Check if the formatted booking date matches the formatted selected date
            return formattedBookingDate.startsWith(formattedSelectedDate.slice(0, 10)); // Compare only date part
        });
    
        setBookingCount(selectedDateBookings.length);
    };


    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/bookings/')
            .then((response) => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    
        // Calculate booking count when Booking_Date changes
        if (Booking_Date) {
            calculateBookingCount();
        }
    }, [Booking_Date]);

    useEffect(() => {
        setLoading(true);
    
        // Check if Booking_Date is not empty
        if (Booking_Date) {
            // Format the selected date to match the format in the database
            const formattedDate = new Date(Booking_Date).toISOString();
            
            axios
                .get(`http://localhost:8076/bookinglimits/${formattedDate}`)
                .then((response) => {
                    setMaxBookingLimit(response.data.Booking_Limit);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [Booking_Date]);

    //validate name
    const validateCustomerName = (name) => {
        // Regular expression for validating customer name (allowing alphabets, spaces, and possibly some special characters)
        const regex = /^[a-zA-Z\s]+$/;
        // Check if the name matches the pattern and its length is within the limit
        return regex.test(name.trim()) && name.trim().length <= 50;
    };
    // Validation function for Vehicle Number
    const validateVehicleNumber = (value) => {
        // Regular expression for alphanumeric with hyphen and space
        const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
        // Check if the value matches the pattern
        if (!value.match(regex)) {
            return false;
        }
        return true;
    };
    //validate contact number
    const validateContactNumber = (number) => {
        // Regular expression for validating contact number (allowing only digits, and ensuring length is within limit)
        const regex = /^0\d{9}$/;
        // Check if the number matches the pattern
        return regex.test(number);
    };
    //validate email
    const validateEmail = (email) => {
        // Regular expression for validating email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if the email matches the pattern
        return regex.test(email);
    };
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

        if (!Booking_Date || !Customer_Name || !Vehicle_Type || !Vehicle_Number || !Contact_Number || !Email || !selectedPackage && selectedServices.length === 0) {
            alert("All fields are required.");
            return;
        }
        if (!validateCustomerName(Customer_Name)) {
            alert('Please enter a valid customer name.');
            return;
        }
        if (!validateVehicleNumber(Vehicle_Number)) {
            alert('Please enter a valid vehicle number.');
            return;
        }
        if (!validateContactNumber(Contact_Number)) {
            alert('Please enter a valid contact number.');
            return;
        }
        if (!validateEmail(Email)) {
            alert('Please enter a valid email address.');
            return;
        }
        const data = {

            Booking_Date,

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
                navigate('/booking/dashboard');

            })
            .catch((error) => {
                setLoading(false);
                if (error.response && error.response.status === 400 && error.response.data.message === 'Booking limit exceeded for the selected date') {
                    alert('Booking limit exceeded for the selected date');
                } else {
                    alert('An error occurred. Please check console for more information');
                    console.log(error);
                }
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
                    <p style={{ color: 'red', fontSize: '1.2rem' }}>Available Bookings: {maxBookingLimit - bookingCount}</p>
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
                        <label style={styles.label}>Services</label>
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


export default AdminCreateBooking