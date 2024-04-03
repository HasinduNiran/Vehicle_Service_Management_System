import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const [serviceHistory, setServiceHistory] = useState([]);
  // Remove the unused variable and setter function
  // const [selectedService, setSelectedService] = useState(null);
  const { id: Register_Number } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const vehicleResponse = await axios.get(`http://localhost:8076/vehicles/${Register_Number}`);
        setVehicle(vehicleResponse.data);

        const serviceHistoryResponse = await axios.get(`http://localhost:8076/ServiceHistory/${Register_Number}`);
        setServiceHistory(serviceHistoryResponse.data|| []);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [Register_Number]);



  // const handleServiceClick = (index) => {
  //   setSelectedService(index);
  // };

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

              <p><span className='font-bold'>Customer Name:</span> {serviceHistory.Customer_Name}</p>
              <p><span className='font-bold'>Allocated Employee:</span> {serviceHistory.Allocated_Employee}</p>            
              <p><span className='font-bold'>Service History:</span> {serviceHistory.Service_History}</p>
              <p><span className='font-bold'>Service Date:</span> {serviceHistory.Service_Date}</p>

              <table className='table'>
                <thead>
                  <tr>
                    <th>Service Date</th>
                    <th className='border border-green-800 rounded-md'>Service History</th>
                    <th className='border border-green-800 rounded-md'>Service Employee</th>
                    <th className='border border-green-800 rounded-md'>Service Customer</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {serviceHistory.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Service_Date}</td>
                      <td className='border border-gray-600 rounded-md'>
                        {selectedService === index ? (
                          <button onClick={() => handleServiceClick(null)}>Hide</button>
                        ) : (
                          <button onClick={() => handleServiceClick(index)}>Show</button>
                        )}
                        {selectedService === index && <div>{item.Service_History}</div>}
                      </td>
                      <td className='border border-gray-600 rounded-md'>{item.Allocated_Employee}</td>
                      <td className='border border-gray-600 rounded-md'>{item.Customer_Name}</td>
                    </tr>
                  ))}
                </tbody> */}

              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneVehicle;
