import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainPart from '../components/MainPart';
import Satisfaction from '../components/Satisfaction';
import WhoWeAre from '../components/WhoWeAre';
import Specification from '../components/Specification';
import Testimonial from '../components/Testimoials'; // Corrected misspelling
import './../Styles/style-starter.css';

const ReadOneHome = () => { // Remove cusID from the props
  const [userData, setUserData] = useState({});
  const { cusID } = useParams(); // Get cusID from the URL
  
  useEffect(() => {
    if (cusID) {
      fetchData();
    }
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
      <Header />
      <MainPart />
      <div className="mt-4 max-w-lg float-right "> {/* Added mx-auto and max-w-lg classes */}
        {/* <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Username</label>
          <input
            type="text"
            value={userData.username || ''}
            readOnly // Add readOnly attribute here
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>CusID</label>
          <input
            type="text"
            value={userData.cusID || ''}
            readOnly // Add readOnly attribute here
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div> */}
        {userData ? (
       <p className="text-right" style={{ color: 'red' }}>Welcome, {userData.firstName}!</p>

        ) : (
          <p>Loading...</p>
        )}
      </div>
      
      <Satisfaction />
      <WhoWeAre />
    
      <Specification />
      <Testimonial />
      {userData && (
        <Link to={`/create/${userData.cusID}`}>
         <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-xl">Booking</button>

        </Link>
      


      )}
        <Link to={`/feedback/create/${userData.cusID}`}>
         <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-xl">feedback</button>

        </Link>

        <Link to={`/Cdashboard/${userData.cusID}`}>
         <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-xl">Dashboard</button>

        </Link>
       
      <Footer />
    </div>
  );
  
};

export default ReadOneHome;