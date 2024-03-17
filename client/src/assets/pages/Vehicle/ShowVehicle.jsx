import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:8076/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Vehicles List</h1>
        <Link to={'/vehicle/create'} className='bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Vehicle</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-green-800 rounded-md'>Vehicle Number</th>
              <th className='border border-green-800 rounded-md'>Vehicle Model</th>
              <th className='border border-green-800 rounded-md'>Vehicle Owner</th>
              <th className='border border-green-800 rounded-md'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.Register_Number}>
                <td className='border border-gray-600 rounded-md'>{vehicle.Register_Number}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Model}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Owner}</td>
                <td className='border border-gray-600 rounded-md'>
                  <Link to={`/vehicle/edit/${vehicle.Register_Number}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                  <Link to={`/vehicle/delete/${vehicle.Register_Number}`} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>
                  <Link to={`/vehicle/get/${vehicle.Register_Number}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Show</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowVehicle;
