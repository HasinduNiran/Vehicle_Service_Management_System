import React ,{useEffect,useState}from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';



const ReadOneVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);


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
                  
                </div>
              </div>
            </div>
          )}



          </div>
  )
}

export default ReadOneVehicle