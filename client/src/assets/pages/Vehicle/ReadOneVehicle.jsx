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
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Vehicle Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className='flex justify-between items-center'>
            <div>
              <p><span className='font-bold'>Vehicle Number:</span> {vehicle.Register_Number}</p>
              <p><span className='font-bold'>Vehicle Model:</span> {vehicle.Model}</p>
              <p><span className='font-bold'>Vehicle Owner:</span> {vehicle.Owner}</p>
              <br></br>

              {serviceHistory.length > 0 ? (
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Service Date</th>
                      <th className='border border-green-800 rounded-md'>Service History</th>
                      <th className='border border-green-800 rounded-md'>Service Employee</th>
                      <th className='border border-green-800 rounded-md'>Service Customer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceHistory.map((service, index) => (
                      <tr key={index}>
                        <td className='border border-gray-600 rounded-md'>{service.Service_Date}</td>
                        <td className='border border-gray-600 rounded-md'>{service.Service_History}</td>
                        <td className='border border-gray-600 rounded-md'>{service.Allocated_Employee}</td>
                        <td className='border border-gray-600 rounded-md'>{service.Customer_Name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No service history available for this vehicle.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneVehicle;
