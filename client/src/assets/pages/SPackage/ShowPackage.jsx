import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

function ShowPackage() {
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/Package`)
      .then((response) => {
        const packagesData = response.data.data;
        setPackages(packagesData);
        const serviceIds = packagesData.reduce((ids, pkg) => [...ids, ...pkg.includes], []);
        fetchServices(serviceIds);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const fetchServices = (serviceIds) => {
    axios
      .get(`http://localhost:8076/Service`)
      .then((response) => {
        const servicesData = response.data.data;
        const servicesMap = {};
        servicesData.forEach(service => {
          if (serviceIds.includes(service._id)) {
            servicesMap[service._id] = service.Servicename;
          }
        });
        setServices(servicesMap);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
                <th className='text-xl mr-4 text-gray-500'>Package Name :</th>
                <th className='text-xl mr-4 text-gray-500'>Package Description :</th>
                <th className='text-xl mr-4 text-gray-500'>Includes :</th>
                <th className='text-xl mr-4 text-gray-500'>Actions :</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg._id}>
                  <td>{pkg.pakgname}</td>
                  <td>{pkg.pkgdescription}</td>
                  <td>
                    <ul>
                      {pkg.includes.map(serviceId => (
                        <li key={serviceId}>{services[serviceId]}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <Link to={`/package/edit/${pkg._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                    <Link to={`/package/get/${pkg._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>View</Link>
                    <Link to={`/package/delete/${pkg._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={`/package/create/`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Create</Link>
        </div>
      )}
    </div>
  );
}

export default ShowPackage;
