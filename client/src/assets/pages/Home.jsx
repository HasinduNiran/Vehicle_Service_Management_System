import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainPart from '../components/MainPart';
import Satisfaction from '../components/Satisfaction';
import WhoWeAre from '../components/WhoWeAre';
import Specification from '../components/Specification';
import Testimonial from '../components/Testimoials'; // Corrected misspelling
import './../Styles/style-starter.css'; 

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      {/* <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Welcome to the Home Page</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/customer/allCustomer" className="text-blue-500 hover:underline">Customer</Link>
            </li>
            <li>
              <Link to="/package" className="text-blue-500 hover:underline">Package</Link>
            </li>                               
            <li>
              <Link to="/service" className="text-blue-500 hover:underline">Services</Link>
            </li>
            <li>
              <Link to="/show-all" className="text-blue-500 hover:underline">Booking</Link>
            </li>
            <li>
              <Link to="/vehicle" className="text-blue-500 hover:underline">Vehicle</Link>
            </li>
            <li>
              <Link to="/inventory/allInventory" className="text-blue-500 hover:underline">Inventory</Link>
            </li>
            <li>
              <Link to="/payments/show" className="text-blue-500 hover:underline">Payment</Link>
            </li>
            <li>
              <Link to="/employees/allEmployee" className="text-blue-500 hover:underline">Employee</Link>
            </li>
            <li>
              <Link to="/feedback" className="text-blue-500 hover:underline">Feedback</Link>
            </li>
            <li>
              <Link to={"/dashboard"} className="text-blue-500 hover:underline">Dashboard</Link>
            </li>
          </ul>
        </nav> */}
      {/* </div> */}
      <MainPart />
      <Satisfaction />
      <WhoWeAre />
      <Specification />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
