import React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/style-starter.css';
 


const Testimonial = () => {
    return (
        <React.Fragment>
            {/* Testimonials */}
            <section className="w3l-testimonials">
                <div className="testimonials py-5">
                    <div className="container text-center py-lg-3">
                        <div className="title-content text-center mb-lg-5 mb-4">
                            <h6 className="sub-title">Client Testimonials</h6>
                            <h3 className="hny-title">100% approved by customers</h3>
                        </div>
                       
                    </div>
                </div>
            </section>
           
        </React.Fragment>
    );
};

export default Testimonial;
