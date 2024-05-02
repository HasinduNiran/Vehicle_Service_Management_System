import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/car.jpg';
import Spinner from '../../components/Spinner';
import { Link,  } from 'react-router-dom';
import logo2 from "../../images/logo2.png";

const AddBookingLimit = () => {
    const [Booking_Date, setBooking_Date] = useState('');
    const [Booking_Limit, setBooking_Limit] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSaveLimit = () => {
        if (!Booking_Date || !Booking_Limit ) {
            alert("All fields are required.");
            return;
        }
        const data = {
            Booking_Date,
            Booking_Limit
        };

        setLoading(true);
        axios
            .post('http://localhost:8076/bookinglimits', data)
            .then(() => {
                setLoading(false);
                alert('Booking limit added successfully.');
                navigate('/booking/bookinglimitdashboard');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check Console for more information');
                console.log(error);
            });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div>   <header id="site-header" className="fixed-top">
        <style>{`
          #site-header {
            background-color: #000000;
            height: 130px;
            width: 100%;
          }
          
          .container {
            width: 100%;
            margin: 0 auto;
            margin-left: 0%;
          }
          
          .navbar-brand {
            display: flex;
            align-items: center;
          }
          
          .logo {
            width: 150px;
            margin-right: 10px;
            margin-top: -10px;
          }

          .navbar-nav {
            flex-direction: row;
          }
        `}</style>
        <div className="container ml-80 pl-80" style={{ paddingLeft: "10px" }} >
          <nav className="navbar navbar-expand-lg navbar-light" style={{ position: 'relative' }}>
            <Link className="navbar-brand" to="/">
              <img src={logo2} alt="Nadeeka Auto Service" className="logo" />
              <h1 style={{ color: 'white', marginTop: '-10px' }}>Nadeeka Auto Service</h1>
            </Link>

            <ul className="navbar-nav ml-auto" style={{ marginRight: "-120px" }}>
              <li className="nav-item ">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {/* <li className="nav-item">



                <Link className="nav-link" onClick={()=>{window.scrollTo({top:2130})}}>Package</Link>

              </li> */}
            </ul>
          </nav>
        </div>
      </header>
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
                        <label style={styles.label}>Booking Limit</label>
                        <input
                            type='Number'
                            value={Booking_Limit}
                            onChange={(e) => setBooking_Limit(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button onClick={handleSaveLimit} style={styles.button}>Save Limit</button>
                </div>
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
        marginTop: '9%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
        padding: '20px',
        border: '2px solid red', // Add a red border
        borderColor: 'red',
        margin: '10px',
        textAlign: 'center',
        position: 'absoulte', // Add this line for absolute positioning of the line
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px',
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        
    },
    heading: {
        fontSize: '3rem',
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
    },
    inputGroup: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '2px solid #ccc',
        backgroundColor: 'white',
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

export default AddBookingLimit;
