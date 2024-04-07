import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';

const ReadOnePackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/Package/${id}`)
      .then((response) => {
        setPackageData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching package:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Package Details</h1>
      {loading ? <Spinner /> : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Package Name:</span>
            <span>{packageData?.pakgname}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Description:</span>
            <span>{packageData?.pkgdescription}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Includes:</span>
            <ul>
              {packageData?.includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Price:</span>
            <span>{packageData?.Price}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOnePackage;
