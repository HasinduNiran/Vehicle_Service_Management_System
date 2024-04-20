import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ShowService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get('http://localhost:8076/Service')
      .then((response) => {
        setServices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const handleDeleteService = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8076/Service/${id}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
              }).then(() => {
                // Update the service list after successful deletion
                fetchServices();
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete service.',
                icon: 'error'
              });
            }
          })
          .catch(error => {
            console.error('Error deleting service:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete service.',
              icon: 'error'
            });
          });
      }
    });
  };

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
                <th className='text-xl mr-4 text-gray-500'>Service Name</th>
                <th className='text-xl mr-4 text-gray-500'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service._id}>
                  <td>{service.Servicename}</td>
                  <td>
                    <Link to={`/Service/edit/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                    <Link to={`/Service/get/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>View</Link>
                    <button onClick={() => handleDeleteService(service._id)} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</button>
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
