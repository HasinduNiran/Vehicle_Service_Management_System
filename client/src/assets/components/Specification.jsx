import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../Styles/style-starter.css';

const Specification = () => {


    return ( 
        <>
            <section className="w3l-specification-6">
                <div className="specification-6-mian py-5">
                    <div className="container py-lg-5">
                        <div className="row story-6-grids">
                            <div className="col-lg-10 story-gd pl-lg-4  text-center mx-auto">
                                <div className="title-content px-lg-5">
                                    <h6 className="sub-title">Our Organization</h6>
                                    <h3 className="hny-title two">Car servicing matched with great workmanship.</h3>
                                    <p className="mt-3 mb-lg-5 px-lg-5 counter-para">Where quality meets efficiency. Trust us for top-notch vehicle maintenance and repairs. Your satisfaction is our priority.</p>
                                </div>
                                <div className="skill_info mt-5 pt-lg-4">
                                    <div className="stats_left">
                                        <div className="counter_grid">
                                            <div className="icon_info">
                                                <p className="counter">65+</p>
                                                <h4>Total projects</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stats_left">
                                        <div className="counter_grid">
                                            <div className="icon_info">
                                                <p className="counter">165+</p>
                                                <h4>Transparency</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stats_left">
                                        <div className="counter_grid">
                                            <div className="icon_info">
                                                <p className="counter">463+</p>
                                                <h4>Done projects</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stats_left">
                                        <div className="counter_grid">
                                            <div className="icon_info">
                                                <p className="counter">5063+</p>
                                                <h4>Get awards</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w3l-pricing">
                <div className="py-5" id="pricing">
                    <div className="container py-lg-5">
                        <div className="title-content text-center mb-5">
                            <h6 className="sub-title">Best Packages</h6>
                            <h3 className="hny-title">Our top rated packages</h3>
                            <p className="fea-para"> We offers comprehensive packages tailored to suit your vehicle's needs. From basic maintenance to advanced diagnostics, our packages ensure your vehicle runs smoothly and efficiently.</p>
                        </div>
                        <div className="row t-in">
                            <div className="col-lg-4 col-md-6 price-main-info">
                                <div className="price-inner card box-shadow">
                                    <div className="card-body">
                                        <h4 className="text-uppercase text-center mb-3">Silver Package</h4>
                                        <h5 className="card-title pricing-card-title">
                                            <span className="align-top">$</span>35
                                        </h5>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li> <span className="fa fa-check"></span> Conventional Oil Change</li>
                                            <li> <span className="fa fa-check"></span> Fuel System Cleaning</li>
                                            <li> <span className="fa fa-check"></span> Coolant Exchange</li>
                                            <li> <span className="fa fa-check"></span> Transmission Fluid Service</li>
                                            <li> <span className="fa fa-check"></span> Visual Brake Inspection</li>
                                            <li> <span className="fa fa-check"></span> Tire Rotation</li>
                                        </ul>
                                        <div className="read-more mt-4 pt-lg-2">
                                            <a href="contact.html" className="btn btn-style btn-outline-primary"> Go Basic</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 price-main-info mt-md-0 mt-4">
                                <div className="price-inner card box-shadow active">
                                    <div className="card-body">
                                        <label className="price-label">Recommended</label>
                                        <h4 className="text-uppercase text-center mb-3">Platinum Package</h4>
                                        <h5 className="card-title pricing-card-title">
                                            <span className="align-top">$</span>69
                                        </h5>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li> <span className="fa fa-check"></span> Conventional Oil Change</li>
                                            <li> <span className="fa fa-check"></span> Fuel System Cleaning</li>
                                            <li> <span className="fa fa-check"></span> Coolant Exchange</li>
                                            <li> <span className="fa fa-check"></span> Transmission Fluid Service</li>
                                            <li> <span className="fa fa-check"></span> Visual Brake Inspection</li>
                                            <li> <span className="fa fa-check"></span> Tire Rotation</li>
                                        </ul>
                                        <div className="read-more mt-4 pt-lg-2">
                                            <a href="contact.html" className="btn btn-style btn-primary"> Go Standard</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 price-main-info mt-lg-0 mt-4">
                                <div className="price-inner card box-shadow">
                                    <div className="card-body">
                                        <h4 className="text-uppercase text-center mb-3">Gold Package</h4>
                                        <h5 className="card-title pricing-card-title">
                                            <span className="align-top">$</span>39
                                        </h5>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li> <span className="fa fa-check"></span> Conventional Oil Change</li>
                                            <li> <span className="fa fa-check"></span> Fuel System Cleaning</li>
                                            <li> <span className="fa fa-check"></span> Coolant Exchange</li>
                                            <li> <span className="fa fa-check"></span> Transmission Fluid Service</li>
                                            <li> <span className="fa fa-check"></span> Visual Brake Inspection</li>
                                            <li> <span className="fa fa-check"></span> Tire Rotation</li>
                                        </ul>
                                        <div className="read-more mt-4 pt-lg-2">
                                            <a href="contact.html" className="btn btn-style btn-outline-primary"> Go Premium</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Specification;
