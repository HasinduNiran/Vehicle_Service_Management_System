import React ,{useEffect,useState}from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';


const ReadOneServiceHistory = () => {



  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    axios
   .get(`http://localhost:8076/ServiceHistory/${id}`)
   .then((res) => {
        setServiceHistory(res.data);
        setLoading(false);
      })
   .catch((err) => {
        console.log(err);
      });
  }, [id]);
  
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Service History Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="card">
          <div className="card-body">
            <p>
              <span className="font-bold">Customer_Name:</span>{" "}
              {serviceHistory.Customer_Name}
            </p>
            <p>
              <span className="font-bold">Allocated_Employee:</span>{" "}
              {serviceHistory.Allocated_Employee}
            </p>
            <p>
              <span className="font-bold">Vehicle_Number:</span>{" "}
              {serviceHistory.Vehicle_Number}
            </p>
            <p>
              <span className="font-bold">Service_History:</span>{" "}
              {serviceHistory.Service_History}
            </p>
          </div>
        </div>
      )}
 
    </div>
  );
}

export default ReadOneServiceHistory