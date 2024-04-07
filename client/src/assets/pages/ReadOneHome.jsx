import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainPart from '../components/MainPart';
import Satisfaction from '../components/Satisfaction';
import WhoWeAre from '../components/WhoWeAre';
import Specification from '../components/Specification';
import Testimonial from '../components/Testimoials'; // Corrected misspelling
import './../Styles/style-starter.css'; 

const ReadOneHome = ({ cusID }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log('cusID received:', cusID);
    fetchData();
  }, [cusID]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8076/customer/${cusID}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Link to={`/create/${ userData.cusID}`}>
                    <button>Booking</button>
                    </Link>
      <Header />
      
      <MainPart />
      <div className="mt-4">
        {userData ? (
          <p>Welcome, {userData.cusID}!</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Satisfaction />
      <WhoWeAre />
      <Specification />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default ReadOneHome;
