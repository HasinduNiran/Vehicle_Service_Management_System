import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';




const ReadOnePackage = () => {
  const [Package, setPackage] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
  
    axios.get(`http://localhost:8076/Package/${id}`)
   .then((response) => {
        setPackage(response.data);
        setLoading(false);
      })
   .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  },[id]);

  return (
    <div className='p-4'>
  <h1 className='text-3xl my-4'>Show Package</h1>
  {loading ? (
    <Spinner />
  ) : (
    <div className='flex flex-col border border-sky-400 rounded-xl w-fit p-4'>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Package Name</span>
        <span>{Package.pakgname}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Package Description</span>
        <span>{Package.pkgdescription}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Includes</span>
        <span>{Package.includes}</span>
      </div>
    </div>
  )}
</div>
  );
}

export default ReadOnePackage;
