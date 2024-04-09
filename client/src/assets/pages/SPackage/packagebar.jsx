import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const packagebar = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/Package')
      .then((response) => {
        setPackages(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
        setLoading(false);
      });
  }, []);

  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:8076/Package/${id}`);
      // Update state after successful deletion
      setPackages(packages.filter(pkg => pkg._id !== id));
    } catch (error) {
      console.error('Error deleting package:', error);
      // Handle error if deletion fails
    }
  };

  return (
    <div className='p'>
      <h1>Packages</h1>
      {loading ? <Spinner /> : (
        <>
          <div className='table-responsive'>
            <table className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th className='text-xl mr-4 text-gray-500'>Package Name</th>
                  <th className='text-xl mr-4 text-gray-500'>Description</th>
                  <th className='text-xl mr-4 text-gray-500'>Includes</th>
                  <th className='text-xl mr-4 text-gray-500'>Price</th>
                  <th className='text-xl mr-4 text-gray-500'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map(pkg => (
                  <tr key={pkg._id}>
                    <td>{pkg.pakgname}</td>
                    <td>{pkg.pkgdescription}</td>
                    <td>
                      <ul>
                        {pkg.includes.map((include, index) => (
                          <li key={index}>{include}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{pkg.Price}</td>
                    <td>
                      <Link to={`/package/${pkg._id}`} className='btn btn-primary mr-2'>View</Link>
                      <Link to={`/package/edit/${pkg._id}`} className='btn btn-warning mr-2'>Edit</Link>
                      <button onClick={() => handleDeletePackage(pkg._id)} className='btn btn-danger'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </div>
          <div className="mt-4">
            <Link to="/package/create" className="btn btn-success">Create New</Link>
          </div>

        

        </>
      )}
    </div>
  );
};

export default packagebar;
