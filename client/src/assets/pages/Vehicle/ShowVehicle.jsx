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
    <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', minHeight: '100vh', width:'80%', alignSelf:'auto'}}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' , alignItems: 'center'}}>Vehicles List</h1>
          <Link to={'/vehicle/create'} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', textDecoration: 'none' }}>Add Vehicle</Link>

          <div style={{ marginBottom: '0.5rem' }}></div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter vehicle"
            style={{ marginRight: '0.5rem', border: '1px solid #ccc', padding: '0.5rem' }}
          />
          <button
            onClick={handleSearch}
            style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: '#f5f5f5' }} ref={componentRef}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Number</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Make</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Model</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Year</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Engine Details</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Transmission Details</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Color</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Features</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Condition Assessment</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Vehicle Owner</th>
                <th style={{ border: '1px solid #008000', borderRadius: '5px', padding: '0.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.Register_Number}>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Register_Number}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Make}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Model}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Year}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Engine_Details}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Transmission_Details}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Vehicle_Color}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Vehicle_Features}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Condition_Assessment}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>{vehicle.Owner}</td>
                  <td style={{ border: '1px solid #666', borderRadius: '5px', padding: '0.5rem' }}>
                    <Link to={`/vehicle/edit/${vehicle._id}`} style={{ backgroundColor: '#007bff', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '5px', textDecoration: 'none', marginRight: '0.5rem' }}>Edit</Link>
                    <Link to={`/vehicle/delete/${vehicle._id}`} style={{ backgroundColor: '#ff6666', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '5px', textDecoration: 'none', marginRight: '0.5rem' }}>Delete</Link>
                    <Link to={`/vehicle/get/${vehicle.Register_Number}`} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '5px', textDecoration: 'none' }}>Show</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
          <button style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={generatePDF}>
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowVehicle;
