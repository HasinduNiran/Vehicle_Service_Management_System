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
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="owl-testimonial owl-carousel owl-theme">
                                    <TestimonialItem
                                        imgSrc="assets/images/team1.jpg"
                                        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit id accusantium officia quod quasi necessitatibus perspiciatis Harum error provident quibusdam tenetur."
                                        name="Jenkins"
                                    />
                                    <TestimonialItem
                                        imgSrc="assets/images/team2.jpg"
                                        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit id accusantium officia quod quasi necessitatibus perspiciatis Harum error provident quibusdam tenetur."
                                        name="John Balmer"
                                    />
                                    <TestimonialItem
                                        imgSrc="assets/images/team3.jpg"
                                        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit id accusantium officia quod quasi necessitatibus perspiciatis Harum error provident quibusdam tenetur."
                                        name="Kiss Kington"
                                    />
                                    <TestimonialItem
                                        imgSrc="assets/images/team4.jpg"
                                        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit id accusantium officia quod quasi necessitatibus perspiciatis Harum error provident quibusdam tenetur."
                                        name="Elizabeth"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*// Testimonials */}
        </React.Fragment>
    );
};

const TestimonialItem = ({ imgSrc, message, name }) => {
    return (
        <div className="item">
            <div className="slider-info mt-lg-4 mt-3">
                <div className="img-circle">
                    <img src={imgSrc} className="img-fluid rounded" alt="client image" />
                </div>
                <div className="message">{message}</div>
                <div className="name">- {name}</div>
            </div>
        </div>
    );
};

export default Testimonial;
