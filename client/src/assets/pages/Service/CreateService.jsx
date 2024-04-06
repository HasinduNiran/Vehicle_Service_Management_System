import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateService = () => {
  const [Servicename, setname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      Servicename
    };
    setLoading(true);
    axios
      .post(`http://localhost:8076/Service/`, data)
      .then(() => {
        setLoading(false);
        navigate('/Service');
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
          <h1 className="text-3xl my-4">Add New Service</h1>
          {loading ? <Spinner /> : ''}
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="Servicename" className="form-label">Service Name : </label>
                  <input
                    type="text"
                    className="form-control"
                    value={Servicename}
                    onChange={(e) => setname(e.target.value)}
                  />
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

export default CreateService;
