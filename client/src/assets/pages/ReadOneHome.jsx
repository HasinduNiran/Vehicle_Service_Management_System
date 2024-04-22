import React, { useState, useEffect } from 'react'; // Add useState import
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Satisfaction from '../components/Satisfaction';
import WhoWeAre from '../components/WhoWeAre';
import Specification from '../components/Specification';
import Testimonial from '../components/Testimoials'; // Corrected misspelling
import './../Styles/style-starter.css';
import axios from 'axios'; // Add axios import
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/bundle";
import img1 from "../images/swiper/1.jpg";
import img2 from "../images/swiper/2.jpg";
import img3 from "../images/swiper/3.png";
import logo2 from "../images/logo2.png"; // Import the logo image

const ReadOneHome = () => {
  const [userData, setUserData] = useState({}); // Initialize userData state
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
  SwiperCore.use([Navigation, Autoplay, EffectCards, Pagination]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header section */}
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
            margin-right: 10px; /* Added margin */
            margin-top: -10px; /* Adjusted margin to move the logo up */
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

            <ul className="navbar-nav ml-auto" style={{ marginRight: "-150px" }}>
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/create/${userData.cusID}`}>Booking</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/package">Package</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to={`/customer/get/${userData.cusID}`}>Dashborad</Link>
              </li>

              <li className="nav-item">
                {/* Display welcome message and user image */}
                {userData.firstName && (
                  <div style={{ position: 'absolute', right: '-35px', top: '50%', transform: 'translateY(-50%)' }}>
                    <img src={userData.image} alt="Welcome" style={{ width: '55px', height: '55px', borderRadius: '100%', marginRight: '2px' }} />
                    <p className="mb-0" style={{ color: 'red' }}>Welcome {userData.firstName}!</p>
                  </div>
                )}
              </li>
            </ul>
          </nav>



        </div>
      </header>

      {/* Other components */}


      <Swiper autoplay={{ delay: 3000 }} navigation={true} modules={[Navigation]} className="mySwiper" >
        <SwiperSlide><img src={img1} className='h-2/5' /></SwiperSlide>
        <SwiperSlide><img src={img2} /></SwiperSlide>
        <SwiperSlide><img src={img3} /></SwiperSlide>

      </Swiper>


      <Satisfaction />
      <WhoWeAre />
      <Specification />
      <Testimonial />

      {/* Render Booking button if userData exists */}
      {/* {userData && (
        <Link to={`/create/${userData.cusID}`}>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-xl">Booking</button>
        </Link>
      )} */}

      {/* Link to Feedback page */}
      {/* <Link to={`/feedback/create/${userData.cusID}`}>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-xl">Feedback</button>
      </Link> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReadOneHome;
