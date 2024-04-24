import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Satisfaction from '../components/Satisfaction';
import WhoWeAre from '../components/WhoWeAre';
import Specification from '../components/Specification';
import Testimonial from '../components/Testimoials'; // Corrected misspelling
import './../Styles/style-starter.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { EffectCards } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import "swiper/css/navigation";
// import "swiper/css/bundle";
// import img1 from "../images/swiper/1.jpg";
// import img2 from "../images/swiper/2.jpg";
// import img3 from "../images/swiper/3.png";
import homevid from './../images/homevid.mp4';


const Home = () => {
  SwiperCore.use([Navigation, Autoplay, EffectCards, Pagination]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* <Swiper autoplay={{ delay: 3000 }} navigation={true} modules={[Navigation]} className="mySwiper" >
        <SwiperSlide><img src={img1} className='h-2/5'/></SwiperSlide>
        <SwiperSlide><img src={img2}/></SwiperSlide>
        <SwiperSlide><img src={img3}/></SwiperSlide>
        
      </Swiper> */}

      <video autoPlay loop muted style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.9)' }}>
        <source src={homevid} type="video/mp4" />
      </video>


      <Satisfaction />
      <WhoWeAre />
      <Specification />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
