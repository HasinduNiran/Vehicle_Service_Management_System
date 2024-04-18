import React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/style-starter.css'; 

const Footer = () => {
  return (
    <footer className="w3l-footer-66">
      <section className="footer-inner-main">
        <div className="footer-hny-grids py-5">
          <div className="container py-lg-4">
            <div className="text-txt">
             
              <div className="right-side">
                <div className="row sub-columns">
                  <div className="col-lg-4 col-md-6 sub-one-left pr-lg-4">
                    <h2>
                      <a className="navbar-brand" href="index.html">
                        <span>N</span>adeeka Auto Service
                      </a>
                    </h2>
                    <p className="pr-lg-4">Your trusted partner for all your vehicle maintenance needs. Expert technicians, prompt service, and quality care for your car. Experience reliability and excellence with us. </p>
                    <div className="columns-2">
                      <ul className="social">
                        <li><a href="#facebook"><span className="fa fa-facebook" aria-hidden="true"></span></a></li>
                        <li><a href="#linkedin"><span className="fa fa-linkedin" aria-hidden="true"></span></a></li>
                        <li><a href="#twitter"><span className="fa fa-twitter" aria-hidden="true"></span></a></li>
                        <li><a href="#google"><span className="fa fa-google-plus" aria-hidden="true"></span></a></li>
                        <li><a href="#github"><span className="fa fa-github" aria-hidden="true"></span></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 sub-one-left">
                    <h6>Our Services</h6>
                    <div className="mid-footer-gd sub-two-right">
                      <ul>
                        <li><a href="about.html"><span className="fa fa-angle-double-right mr-2"></span> About</a></li>
                        <li><a href="services.html"><span className="fa fa-angle-double-right mr-2"></span> Services</a></li>
                        <li><a href="#"><span className="fa fa-angle-double-right mr-2"></span> Car Wash</a></li>
                        <li><a href="#"><span className="fa fa-angle-double-right mr-2"></span> Electrical system</a></li>
                      </ul>
                      <ul>
                        <li><a href="#"><span className="fa fa-angle-double-right mr-2"></span> Tire and wheel</a></li>
                        <li><a href="#"><span className="fa fa-angle-double-right mr-2"></span> Help Orphan</a></li>
                        <li><a href="#support"><span className="fa fa-angle-double-right mr-2"></span> Career</a></li>
                        <li><a href="contact.html"><span className="fa fa-angle-double-right mr-2"></span> Contact US</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 sub-one-left">
                    <h6>Contact Info</h6>
                    <div className="sub-contact-info">
                      <p>Address: 8436 Jasmine Parkway, Mountain View, CA 84043, United States.</p>
                      <p className="my-3">Phone: <strong><a href="tel:+24160033999">+24 1600-33-999</a></strong></p>
                      <p>E-mail:<strong> <a href="mailto:info@example.com">info@example.com</a></strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
