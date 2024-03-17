import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';




const ReadOneServiceHistory = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const {Vehicle_Number: id  } = useParams(); // Extract Vehicle_Number instead of id

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/ServiceHistory/${id}`)
      .then((res) => {
        setServiceHistory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const toggleRow = (index) => {
    setExpandedRows((prevExpandedRows) => {
      const isRowExpanded = prevExpandedRows.includes(index);
      if (isRowExpanded) {
        return prevExpandedRows.filter((rowIndex) => rowIndex !== index);
      } else {
        return [...prevExpandedRows, index];
      }
    });
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Service History Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Allocated Employee</th>
              <th>Vehicle Number</th>
              <th>Service History</th>
              
            </tr>
          </thead>
          <tbody>
            {serviceHistory.map((historyItem, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{historyItem.Customer_Name}</td>
                  <td>{historyItem.Allocated_Employee}</td>
                  <td>{historyItem.Vehicle_Number}</td>
            
                  <td>
                    <button onClick={() => toggleRow(index)}>
                      {expandedRows.includes(index) ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <tr>
                    <td colSpan="5">
                      <div>
                        <p>Customer Name: {historyItem.Customer_Name}</p>
                        <p>Service Description: {historyItem.Service_History}</p>

                        <p>Service Date: {historyItem.Service_Date}</p>
                        <p>Service Cost: {historyItem.Service_Cost}</p>
                        <p>Service Provider: {historyItem.Service_Provider}</p>
                       
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadOneServiceHistory;
