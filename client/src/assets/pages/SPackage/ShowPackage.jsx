import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';


function ShowPackage() {
  const [Package, setPackage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/Package`)
      .then((response) => {
        setPackage(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p'>
      <label>Package</label>

      {loading ? (
        <Spinner />
      ) : (
        <div className='table-responsive'>
          <table className='table table-bordered table-hover'>
            <thead>
              <tr>
                <th className='text-xl mr-4 text-gray-500'>pakgname :</th>
                <th className='text-xl mr-4 text-gray-500'>pkgdescription :</th>
                <th className='text-xl mr-4 text-gray-500'>includes :</th>
                <th className='text-xl mr-4 text-gray-500'>actions :</th>
              </tr>
            </thead>
            <tbody>
              {Package.map((Package) => (
                <tr key={Package._id}>
                  <td>{Package.pakgname}</td>
                  <td>{Package.pkgdescription}</td>
                  <td>{Package.includes}</td>
<td>

<Link to={`/package/edit/${Package._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
<Link to={`/package/get/${Package._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>View</Link>
<Link to={`/package/delete/${Package._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>

</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ShowPackage;






