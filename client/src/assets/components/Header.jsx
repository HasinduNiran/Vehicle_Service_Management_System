import React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/style-starter.css';

const Header = () => {
    return (
        <header id="site-header" className="fixed-top">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <h1>
                        <Link className="navbar-brand" to="/">
                            <span>N</span>adeeka Auto Service
                        </Link>
                    </h1>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cLogin">Login</Link>
                    </li>
                    <li>
                        <Link to="/service" className="text-blue-500 hover:underline">Services</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/package">Package</Link>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/customer/allCustomer">Customer</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/show-all">Booking</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/servicehistory">Service History</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/feedback">Feedback</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/inventory/allInventory">Inventory</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/vehicle">Vehicle</Link>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employees/EmployeeDashboard">Employee</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/payments/show">Payment</Link>
                    </li>




                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fa icon-expand fa-bars"></span>
                        <span className="fa icon-close fa-times"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">Services</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav search-right mt-lg-0 mt-2">
                            <li className="nav-item mr-3" title="Search">
                                <a href="#search" className="btn search-search">
                                    <span className="fa fa-search" aria-hidden="true"></span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="btn btn-primary d-none d-lg-block btn-style mr-2">Contact Us</Link>
                            </li>
                        </ul>
                        <div id="search" className="pop-overlay">
                            <div className="popup">
                                <form action="#" method="GET" className="d-sm-flex">
                                    <input type="search" placeholder="Search.." name="search" required="required" autoFocus />
                                    <button type="submit">Search</button>
                                    <a className="close" href="#url">&times;</a>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-position">
                        <nav className="navigation">
                            <div className="theme-switch-wrapper">
                                <label className="theme-switch" htmlFor="checkbox">
                                    <input type="checkbox" id="checkbox" />
                                    <div className="mode-container">
                                        <i className="gg-sun"></i>
                                        <i className="gg-moon"></i>
                                    </div>
                                </label>
                            </div>
                        </nav>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
