import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePackage = () => {
  const [pakgname, setPakgname] = useState('');
  const [pkgdescription, setPkgdescription] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [Price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/service')
      .then((response) => {
        setServices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setLoading(false);
      });
  }, []);

  const handleServiceSelect = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter(service => service !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleSavePackage = () => {
    const data = {
      pakgname,
      pkgdescription,
      includes: selectedServices,
      Price
    };
    setLoading(true);

    axios.post('http://localhost:8076/Package', data)
      .then(() => {
        setLoading(false);
        navigate('/package');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Add Package</h1>
      {loading && <Spinner />}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Package Name</label>
          <input
            type="text"
            value={pakgname}
            onChange={(e) => setPakgname(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={pkgdescription}
            onChange={(e) => setPkgdescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Includes</label>
          <div className="flex flex-wrap">
            {services.map(service => (
              <button
                key={service._id}
                className={`bg-gray-200 mr-2 mb-2 px-4 py-2 rounded ${selectedServices.includes(service.Servicename) ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleServiceSelect(service.Servicename)}
              >
                {service.Servicename}
              </button>
            ))}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            type="number"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleSavePackage}>
          Save
        </button>
        
      </div>
    </div>
  );
};

export default CreatePackage;
