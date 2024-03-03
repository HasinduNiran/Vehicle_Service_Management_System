import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams }from 'react-router-dom';
import BackButton from '../components/BackButton';


export default function ShowPackage() {
  const [pkg, setPackage] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http:/localhost:5173/packages/${id}`)
    .then((response) => {
      setPackage(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, [])
  return (
    <div classname= 'p-4'> 
      <BackButton/>
      <h1 className= 'text-3x1 my-4'>Show Package</h1>
      {loading ? (
        <Spinner/>
      ) : (
        <div className='flex flex-col border-spacing-2 border-sky-400 rounded-xl w fit p-4'>
          <div classname='my-4'>
            <span className= 'text-xl mr-4 text-gray-500'>ID</span>
            <span>{pkg._id}</span>
          </div>
        </div> 
      )}
    
    </div>
  )
}
