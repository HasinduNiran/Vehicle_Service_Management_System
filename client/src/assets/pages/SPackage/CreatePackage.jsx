import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePackage = () => {
  const [pakgname, setPakgname] = useState('');
  const [pkgdescription, setPkgdescription] = useState('');
  const [includes, setIncludes] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8076/Service')
      .then(response => {
        setServices(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleServiceChange = (e) => {
    const serviceName = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add service name to includes array
      setIncludes([...includes, serviceName]);
    } else {
      // Remove service name from includes array
      setIncludes(includes.filter(name => name !== serviceName));
    }
  };

  const handleSubmit = async () => {
    const data = {
      pakgname,
      pkgdescription,
      includes
    };
    setLoading(true);
    axios.post(`http://localhost:8076/Package/`, data)
      .then(() => {
        setLoading(false);
        navigate('/package');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <div className="p-4">
          <h1 className="text-3xl my-4">Add New Package</h1>
          {loading ? <Spinner /> : ''}
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="pakgname" className="form-label">Package Name : </label>
                  <input
                    type="text"
                    className="form-control"
                    value={pakgname}
                    onChange={(e) => setPakgname(e.target.value)}
                  />

                  <label htmlFor="pkgdescription" className="form-label">Package Description : </label>
                  <textarea
                    className="form-control"
                    value={pkgdescription}
                    onChange={(e) => setPkgdescription(e.target.value)}
                  />

                  <label className="form-label">Package includes : </label>
                  {services.map(service => (
                    <div key={service._id} className="mb-2">
                      <input
                        type="checkbox"
                        id={service._id}
                        value={service.Servicename} // Use service name as value
                        onChange={handleServiceChange}
                        checked={includes.includes(service.Servicename)} // Check if service name is included in includes
                      />
                      <label htmlFor={service._id}>{service.Servicename}</label>
                    </div>
                  ))}

                  <button type="button" className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePackage;
