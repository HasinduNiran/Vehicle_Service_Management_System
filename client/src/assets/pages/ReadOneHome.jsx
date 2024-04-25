import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Satisfaction from '../components/Satisfaction';
import WhoWeAre from '../components/WhoWeAre';
import Specification from '../components/Specification';
import Testimonial from '../components/Testimoials'; // Corrected misspelling
import './../Styles/style-starter.css';
import axios from 'axios'
import logo2 from "../images/logo2.png";
import getready from './../images/getready.mp4';

const ReadOneHome = () => {
  const [userData, setUserData] = useState({});
  const { cusID } = useParams();

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
      <header id="site-header" className="fixed-top">
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
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/create/${userData.cusID}`}>Booking</Link>
              </li>
              <li className="nav-item">



                <Link className="nav-link" onClick={()=>{window.scrollTo({top:2130})}}>Package</Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/customer/get/${userData.cusID}`}>My Profile</Link>
              </li>
              <li className="nav-item">
                {userData.firstName && (
                  <div style={{ position: 'absolute', right: '-55px', top: '50%', transform: 'translateY(-50%)' }}>
                    <img src={userData.image} alt="Welcome" style={{ width: '55px', height: '55px', borderRadius: '100%', marginRight: 'px' }} />
                    <p className="mb-0" style={{ color: 'red' }}>Welcome</p><p className="mb-0" style={{ color: 'yellow' }}> {userData.firstName}!</p>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <video autoPlay loop muted style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.9)' }}>
        <source src={getready} type="video/mp4" />
      </video>

      <Satisfaction />
      <WhoWeAre />
      <Specification usr= {cusID}/>
      <Testimonial />

      <Footer />
    </div>
  );
};

export default ReadOneHome;
