import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';


function ShowService() {
  const [Service, setService] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/Service`)
      .then((response) => {
        setService(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p'>
      <label>Service</label>

      {loading ? (
        <Spinner />
      ) : (
        <div className='table-responsive'>
          <table className='table table-bordered table-hover'>
            <thead>
              <tr>
                <th className='text-xl mr-4 text-gray-500'>Servicename :</th>
                <th className='text-xl mr-4 text-gray-500'>actions :</th>
              </tr>
            </thead>
            <tbody>
              {Service.map((Service) => (
                <tr key={Service._id}>
                  <td>{Service.Servicename}</td>
<td>

<Link to={`/Service/edit/${Service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
<Link to={`/Service/get/${Service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>View</Link>
<Link to={`/Service/delete/${Service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>

</td>

                </tr>
              ))}
            </tbody>
          </table>
          <Link to={`/Service/create/`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Create</Link>

        </div>
      )}
    </div>
  );
}

export default ShowService;






