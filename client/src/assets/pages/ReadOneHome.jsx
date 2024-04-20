import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Satisfaction from '../components/Satisfaction';
import WhoWeAre from '../components/WhoWeAre';
import Specification from '../components/Specification';
import Testimonial from '../components/Testimoials'; // Corrected misspelling
import logo2 from './../images/logo2.png';

const ReadOneHome = () => {
  const [userData, setUserData] = useState({});
  const { cusID } = useParams(); // Accessing URL parameters
  
  useEffect(() => {
    if (cusID) {
      fetchData(); // Fetch user data when cusID changes
    }
  }, [cusID]);
  
  // Function to fetch user data
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8076/customer/${cusID}`);
      setUserData(response.data); // Update userData state with fetched data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header section */}
      <header id="site-header" className="fixed-top">
  <style>{`
    #site-header {
      background-color: #000000;
      height: 130px;
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
      margin-right: 10px; /* Added margin */
      margin-top: -10px; /* Adjusted margin to move the logo up */
    }
    
    .navbar-nav {
      flex-direction: row;
    }
  `}</style>
  <div className="container ml-80 pl-80" style={{ paddingLeft:"10px" }} >
    
  <nav className="navbar navbar-expand-lg navbar-light"  >
  <Link className="navbar-brand" to="/">
    <img src={logo2} alt="Nadeeka Auto Service" className="logo" />
    <h1 style={{ color: 'red', marginTop: '-10px' }}>Nadeeka Auto Service</h1>
  </Link>
  
  <ul className="navbar-nav ml-auto" style={{ paddingLeft:"150px", marginRight:
"50px" }}>
    <li className="nav-item active">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/cLogin">Login</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/package">Package</Link>
    </li>
    
      {/* Display welcome message if userData.firstName exists */}
      {userData.firstName && (
        <div className="d-flex" style={{ display:"flex", flexDirection:"column", position:"absolute", marginLeft:"300px"}} >
          <li className="nav-item">
          <img src={userData.image} alt="Welcome" style={{ width: '50px', height: '50px', borderRadius: '10%',  }} />
          </li>
            <p className="mb-0" style={{ color: 'red', top:'20px' }}>{userData.firstName}!</p>
            {/* You can add more information here if needed */}
        
        </div>
      )}
    
  </ul>
</nav>


  </div>
</header>




      {/* Content section */}
      <div className="mt-4 max-w-lg float-right">
        {/* Display welcome message if userData exists */}
        {userData ? (
          <p className="text-right" style={{ color: 'red' }}>Welcome, {userData.firstName}!</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Other components */}
      <Satisfaction />
      <WhoWeAre />
      <Specification />
      <Testimonial />
      
      {/* Render Booking button if userData exists */}
      {userData && (
        <Link to={`/create/${userData.cusID}`}>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-xl">Booking</button>
        </Link>
      )}

      {/* Link to Feedback page */}
      <Link to={`/feedback/create/${userData.cusID}`}>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-xl">Feedback</button>
      </Link>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReadOneHome;
