import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, unstable_usePrompt } from 'react-router-dom';
import './../Styles/style-starter.css';
import './../pages/SPackage/ShowPackage';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Specification = (props) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8076/Package')
            .then((response) => {
                // Filter out expired packages (if expiration date is provided and valid)
                const filteredPackages = response.data.data.filter(pkg => !pkg.exp || (pkg.exp && new Date(pkg.exp) > new Date()));
                setPackages(filteredPackages);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching packages:', error);
                setLoading(false);
            });
    }, []);

    const handleView = (item) => {
        setOpen(item);
        console.log(item);
    };

    // Function to calculate remaining days and time
    const getRemainingTime = (expirationDate) => {
        const now = new Date();
        const expDate = new Date(expirationDate);
        const diff = expDate.getTime() - now.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return { days, hours, minutes };
    };
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
            <section className="w3l-pricing" >
                <div className="py-5" id="pricing">
                    <div className="container py-lg-5">
                        <div className="title-content text-center mb-5">
                            <h6 className="sub-title">Best Packages</h6>
                            <h3 className="hny-title">Our top rated packages</h3>
                            <p className="fea-para"> We offers comprehensive packages tailored to suit your vehicle's needs. From basic maintenance to advanced diagnostics, our packages ensure your vehicle runs smoothly and efficiently.</p>
                        </div>
                        <div className="row t-in" style={{ marginLeft: "110px" }} >
                            {packages.map((pkg) => (
                                <div className="col-lg-4 col-md-6 price-main-info" style={{ height: "570px" }} key={pkg._id}>
                                    <div className="price-inner card box-shadow" style={{ height: "590px" }}>
                                        <div className="card-body">
                                            <h4 className="text-uppercase text-center mb-3">{pkg.pakgname}</h4>
                                            <h5 className="card-title pricing-card-title">
                                                <span className="align-top">LKR</span>{pkg.Price}</h5>
                                            {pkg.exp && (

                                                <h5 style={{}}><span className="align-top">Expiors on {pkg.exp}</span></h5>
                                            )}
                                            <br/>
                                            {pkg.exp && (
                                                <div>
                                                <p>Remaining :</p>
                                                <p className="card-title pricing-card-title" style={{background:"red", color:"black", padding:"5px", borderRadius:"10px", fontSize:"30px"}}> {getRemainingTime(pkg.exp).days}<span className="align-top">days</span> , {getRemainingTime(pkg.exp).hours} <span className="align-top">H</span>, {getRemainingTime(pkg.exp).minutes} <span className="align-top">Min</span></p>
                                                </div>
                                            )}
                                            <p>{pkg.pkgdescription}</p>
                                            {/* Check if expiration date exists */}

                                            {/* Calculate and display remaining days and time if expiration date exists */}

                                            <ul className="list-unstyled mt-3 mb-4">
                                                {pkg.includes.map((include, index) => (
                                                    <li key={index}><span className="fa fa-check"></span> {include}</li>
                                                ))}
                                            </ul>
                                            <div className="read-more " style={{ position: "absolute", bottom: "0", marginBottom: "10px" }}>
                                                {props.usr ? (<Link to={`/create/${props.usr}`} className="btn btn-style btn-outline-primary"> Make Appointment</Link>) :
                                                    (<Link to={`/cLogin`} className="btn btn-style btn-outline-primary"> Make Appointment</Link>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {open && (
                                <div style={{ height: "200px", width: "500px", position: "absolute", marginLeft: "350px", marginTop: "250px" }}>
                                    <div className="card box-shadow" style={{ height: "520px" }}>
                                        <div className="card-body">
                                            <h4 className="text-uppercase text-center mb-3">{open.pakgname}</h4>
                                            <h5 className="card-title pricing-card-title">
                                                <span className="align-top">LKR</span>{open.Price}
                                            </h5>
                                            <p>{open.pkgdescription}</p>
                                            <ul className="list-unstyled mt-3 mb-4">
                                                {open.includes.map((include, index) => (
                                                    <li key={index}><span className="fa fa-check"></span> {include}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button className="btn btn-style btn-outline-primary" onClick={() => setOpen(null)}>Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Specification;



