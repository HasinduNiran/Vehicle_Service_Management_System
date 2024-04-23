import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import backgroundImage from '../../images/t.jpg';

const ReadOneVehicle = () => {
  const [vehicle, setVehicle] = useState({});
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
        setServiceHistory(serviceHistoryResponse.data || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [Register_Number]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Vehicle Details :  {vehicle.Register_Number}</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.vehicleContainer}>
          <div style={styles.vehicleInfo}>
            <h2 style={styles.subHeading}  >Vehicle Information </h2>
            <div style={styles.infoGrid}>
              <div style={styles.imageContainer}>
                <img src={vehicle.image} alt="Vehicle" style={styles.vehicleImage} />
              </div>
              <div style={styles.vehicleDetails}>
                <p><span style={styles.label}>Vehicle Number:</span> <span style={styles.value}>{vehicle.Register_Number}</span></p>
                <p><span style={styles.label}>Vehicle Make:</span><span style={styles.value}> {vehicle.Make}</span></p>
                <p><span style={styles.label}>Vehicle Model:</span><span style={styles.value}> {vehicle.Model}</span></p>
                <p><span style={styles.label}>Vehicle Year:</span><span style={styles.value}> {vehicle.Year}</span></p>
                <p><span style={styles.label}>Vehicle Engine Details:</span><span style={styles.value}> {vehicle.Engine_Details}</span></p>
                <p><span style={styles.label}>Vehicle Transmission Details:</span><span style={styles.value}> {vehicle.Transmission_Details}</span></p>
                <p><span style={styles.label}>Vehicle Color:</span><span style={styles.value}> {vehicle.Vehicle_Color}</span></p>
                <p><span style={styles.label}>Vehicle Features:</span><span style={styles.value}> {vehicle.Vehicle_Features}</span></p>
                <p><span style={styles.label}>Condition Assessment:</span><span style={styles.value}> {vehicle.Condition_Assessment}</span></p>
                <p><span style={styles.label}>Vehicle Owner:</span><span style={styles.value}> {vehicle.Owner}</span></p>
              </div>
            </div>
          </div>
          <div style={styles.serviceHistory}>
            <h2 style={styles.subHeading}>Service Histories</h2>
            {serviceHistory.length > 0 ? (
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHeader}>Service Date</th>
                    <th style={styles.tableHeader}>Service History</th>
                    <th style={styles.tableHeader}>Service Employee</th>
                    <th style={styles.tableHeader}>Service Customer</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceHistory.map((service, index) => (
                    <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                      <td style={styles.tableCell}>{service.Service_Date}</td>
                      <td style={styles.tableCell}>{service.Service_History}</td>
                      <td style={styles.tableCell}>{service.Allocated_Employee}</td>
                      <td style={styles.tableCell}>{service.Customer_Name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={styles.noServiceHistory}>No service history available for this vehicle.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#fff',
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'yellow',
    textAlign: 'center',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',

  },
  vehicleContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 4, 0.6)',
    borderRadius: '10px',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    padding: '20px',
    border: '2px solid red',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  vehicleInfo: {
    marginBottom: '30px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid white',
    borderRadius: '20px',
    padding: '20px',
  },
  vehicleImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '20px',
  },
  vehicleDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    color: 'red',
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
  },
  serviceHistory: {
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    background: '#333',
    color: 'red',
    textAlign: 'center',
  },
  tableHeader: {
    padding: '10px',
    textAlign: 'left',
    color: 'red',
  },
  tableRowEven: {
    background: '#2f2f2f',
  },
  tableRowOdd: {
    background: '#1f1f1f',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
  },
  noServiceHistory: {
    textAlign: 'center',
    color: 'white',
  },
};

export default ReadOneVehicle;
