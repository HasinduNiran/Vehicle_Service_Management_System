import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import PackageReport from './PackageReport';

const ShowPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8076/searchpackage?search=${searchQuery}`);
      setPackages(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setLoading(false);
    }
  };

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

  const handleDeletePackage = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8076/Package/${id}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your package has been deleted.",
                icon: "success"
              }).then(() => {
                // Refresh the package list after successful deletion
                window.location.reload();
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete package.",
                icon: "error"
              });
            }
          })
          .catch(error => {
            console.error("Error deleting package:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete package.",
              icon: "error"
            });
          });
      }
    });
  };

// Search filter 
const applySearchFilter = (pkg) => {
  const pakgname = pkg.pakgname ? pkg.pakgname.toLowerCase() : '';
  const pkgdescription = pkg.pkgdescription ? pkg.pkgdescription.toLowerCase() : '';
  const includes = pkg.includes ? pkg.includes.join(',').toLowerCase() : ''; // Join array elements into a string
  const Price = typeof pkg.Price === 'string' ? pkg.Price.toLowerCase() : String(pkg.Price); // Convert Price to string if it's not already

  return (
    pakgname.includes(searchQuery.toLowerCase()) ||
    pkgdescription.includes(searchQuery.toLowerCase()) ||
    includes.includes(searchQuery.toLowerCase()) || // Check if includes contains the searchQuery
    Price.includes(searchQuery.toLowerCase())
  );
};

  const filteredpkg = packages.filter(applySearchFilter);


  

  return (
    <div className='p'>
      <h1>Packages</h1>
      {loading ? <Spinner /> : (
        <>
          <div className='table-responsive'>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter package name or description to search"
              style={{ marginRight: '0.5rem', border: '1px solid #ccc', padding: '0.5rem' }}
            />
            <button 
              onClick={handleSearch}
              style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
            >
              Search
            </button>
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
                {filteredpkg.map(pkg => (
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
          <div style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
            <PackageReport filteredpkg={filteredpkg} />
          </div>

        </div>
          </div>
          <div className="mt-4">
            <Link to="/package/create" className="btn btn-success">Create New</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowPackages;
