import React from 'react';
import { Link } from 'react-router-dom';
import myImage from './../images/ab1.jpg'; 
import './../Styles/style-starter.css';

const WhoWeAre = () => {
  return (

    
    <section className="w3l-content-3">
      {/* /content-3-main */}
      <div className="content-3-main py-5">
        <div className="container py-lg-5">
          <div className="content-info-in row">
            <div className="col-lg-6">
              {/* Using imported image */}
              <img src={myImage} alt="" className="img-fluid" />   
            </div>
            <div className="col-lg-6 mt-lg-0 mt-5 about-right-faq align-self pl-lg-5">
              <div className="title-content text-left mb-2">
                <h6 className="sub-title">Who We Are</h6>
                <h3 className="hny-title">We have 10 years of experience in this field.</h3>
              </div>
              <p className="mt-3">At Nadeeka Auto Service, we pride ourselves on our decade-long expertise in the automotive service management industry. With ten years of hands-on experience, we've honed our skills and refined our solutions to deliver unparalleled service excellence. From innovative technology to personalized customer care, we're committed to providing the highest quality solutions tailored to meet your specific needs. Trust in our proven track record and let us exceed your expectations every step of the way."</p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
