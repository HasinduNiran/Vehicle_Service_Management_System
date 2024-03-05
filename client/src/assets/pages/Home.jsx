import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
