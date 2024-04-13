import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [serviceHistory, setServiceHistory] = useState([]);

  const { id: Register_Number } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const vehicleResponse = await axios.get(`http://localhost:8076/vehicles/${Register_Number}`);
        setVehicle(vehicleResponse.data);

        const serviceHistoryResponse = await axios.get(`http://localhost:8076/ServiceHistory/${Register_Number}`);
        if (serviceHistoryResponse.data && serviceHistoryResponse.data.length > 0) {
          setServiceHistory(serviceHistoryResponse.data);
          setCount(serviceHistoryResponse.data.length);
        } else {
          setServiceHistory([]);
          setCount(0);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [Register_Number]);

  return (
    <div style={{ backgroundColor: '#1f1f1f', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px', color: '#fff' }}>Vehicle Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#2f2f2f', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.8)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Vehicle Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Number:</span> <span style={{ color: 'red' }}>{vehicle.Register_Number}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Make:</span><span style={{ color: 'red' }}> {vehicle.Make}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Model:</span><span style={{ color: 'red' }}> {vehicle.Model}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Year:</span><span style={{ color: 'red' }}> {vehicle.Year}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Engine Details:</span><span style={{ color: 'red' }}> {vehicle.Engine_Details}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Transmission Details:</span><span style={{ color: 'red' }}> {vehicle.Transmission_Details}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Color:</span><span style={{ color: 'red' }}> {vehicle.Vehicle_Color}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Features:</span><span style={{ color: 'red' }}> {vehicle.Vehicle_Features}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Condition Assessment:</span><span style={{ color: 'red' }}> {vehicle.Condition_Assessment}</span></p>
              <p><span style={{ fontWeight: 'bold', color: '#fff' }}>Vehicle Owner:</span><span style={{ color: 'red' }}> {vehicle.Owner}</span></p>

            </div>
          </div>
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Service Histories</h2>
            {serviceHistory.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#333', color: '#fff' }}>
                  <tr>
                    <th style={{ padding: '10px', textAlign: 'left', color: 'red' }}>Service Date</th>
                    <th style={{ padding: '10px', textAlign: 'left', color: 'red' }}>Service History</th>
                    <th style={{ padding: '10px', textAlign: 'left', color: 'red' }}>Service Employee</th>
                    <th style={{ padding: '10px', textAlign: 'left', color: 'red' }}>Service Customer</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceHistory.map((service, index) => (
                    <tr key={index} style={{ background: index % 2 === 0 ? '#2f2f2f' : '#1f1f1f' }}>
                      <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{service.Service_Date}</td>
                      <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{service.Service_History}</td>
                      <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{service.Allocated_Employee}</td>
                      <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{service.Customer_Name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No service history available for this vehicle.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneVehicle;
