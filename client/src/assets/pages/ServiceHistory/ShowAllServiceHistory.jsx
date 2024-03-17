import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowAllServiceHistory = () => {
  const [serviceHistories, setServiceHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/ServiceHistory')
      .then((res) => {
        setServiceHistories(res.data.service);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Service History</h1>
        <Link to='/ServiceHistory/create' className="text-sky-800 text-4xl">Add History</Link>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2">Allocated Employee</th>
              <th className="border border-gray-300 px-4 py-2">Vehicle Number</th>
              <th className="border border-gray-300 px-4 py-2">Service History</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceHistories.map((service) => (
              <tr key={service._id}>
                <td className="border border-gray-300 px-4 py-2">{service.Customer_Name}</td>
                <td className="border border-gray-300 px-4 py-2">{service.Allocated_Employee}</td>
                <td className="border border-gray-300 px-4 py-2">{service.Vehicle_Number}</td>
                <td className="border border-gray-300 px-4 py-2">{service.Service_History}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/ServiceHistory/edit/${service.Vehicle_Number}`} className="btn-edit">Edit</Link>
                  <Link to={`/ServiceHistory/delete/${service.Vehicle_Number}`} className="btn-delete">Delete</Link>
                  <Link to={`/ServiceHistory/get/${service.Vehicle_Number}`} className="btn-show">Show</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>{count} {count === 1 ? 'record' : 'records'} found</p>
    </div>
  );
};

export default ShowAllServiceHistory;
