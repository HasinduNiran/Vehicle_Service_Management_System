import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const ShowVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef();

  //search query
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8076/searchvehicle?search=${searchQuery}`);
      setVehicles(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching vehicle:", err);
      setLoading(false);
    }
  };

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

  // Report generating
  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'vehicle List',
    onAfterPrint: () => alert('Data saved in PDF'),
  });
  //search filter 

  const applySearchFilter = (vehicle) => {
    return (
      vehicle.Register_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.Make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.Model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.selectedYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.Owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredVehicles = vehicles.filter(applySearchFilter);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Vehicles List</h1>
        <Link to={'/vehicle/create'} className='bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Vehicle</Link>

        <div className="mb-4"></div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter vehicle "
          className="mr-2 border border-gray-400 p-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        //
        <table className='w-full border-separate border-spacing-2' ref={componentRef}>
          <thead>
            <tr>
              <th className='border border-green-800 rounded-md'>Vehicle Number</th>
              <th className='border border-green-800 rounded-md'>Vehicle Make</th>
              <th className='border border-green-800 rounded-md'>Vehicle Model</th>
              <th className='border border-green-800 rounded-md'>Vehicle Year</th>
              <th className='border border-green-800 rounded-md'>Engine Details</th>
              <th className='border border-green-800 rounded-md'>Transmission Details</th>
              <th className='border border-green-800 rounded-md'>Vehicle Color</th>
              <th className='border border-green-800 rounded-md'>Vehicle Features</th>
              <th className='border border-green-800 rounded-md'>Condition Assessment</th>
              <th className='border border-green-800 rounded-md'>Vehicle Owner</th>
              <th className='border border-green-800 rounded-md'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.Register_Number}>
                <td className='border border-gray-600 rounded-md'>{vehicle.Register_Number}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Make}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Model}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Year}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Engine_Details}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Transmission_Details}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Vehicle_Color}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Vehicle_Features}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Condition_Assessment}</td>
                <td className='border border-gray-600 rounded-md'>{vehicle.Owner}</td>
                <td className='border border-gray-600 rounded-md'>
                  <Link to={`/vehicle/edit/${vehicle._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                  <Link to={`/vehicle/delete/${vehicle._id}`} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>
                  <Link to={`/vehicle/get/${vehicle.Register_Number}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Show</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
      <div className="flex justify-center items-center mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default ShowVehicle;
