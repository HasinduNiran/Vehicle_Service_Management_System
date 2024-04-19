import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8076/searchCustomer?search=${searchQuery}`
      );
      setCustomer(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching customer:", error);
      setError("An error occurred while fetching the customer for the search query.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/customer')
      .then((response) => {
        setCustomer(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

 const applySearchFilter = (customer) => {
  if (!customer) return false; // Check if customer is defined
  const { firstName, lastName, NIC, phone, email, username, password } = customer;
  const searchLowerCase = searchQuery.toLowerCase();
  return (
    (firstName && firstName.toLowerCase().includes(searchLowerCase)) ||
    (lastName && lastName.toLowerCase().includes(searchLowerCase)) ||
    (NIC && NIC.toLowerCase().includes(searchLowerCase)) ||
    (phone && phone.toLowerCase().includes(searchLowerCase)) ||
    (email && email.toLowerCase().includes(searchLowerCase)) ||
    (username && username.toLowerCase().includes(searchLowerCase)) ||
    (password && password.toLowerCase().includes(searchLowerCase))
  );
};

  const filteredCustomer = customer.filter(applySearchFilter);

  return (

    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Customer List</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
            className="mr-2 border border-gray-400 p-2"
          />  

          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
      </div>
        
        <div className="flex justify-center items-center mt-8">
          <Link to='/customer/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Customer
          </Link>
          <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
          <Link to='/customer/ReportCustomer' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Report
          </Link>
        </div>
      </div>

      {/* Display loading spinner or inventory table */}
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              {/* Table headers */}
              <th className='border border-slate-600 rounded-md'>Profile Pic</th>
              <th className='border border-slate-600 rounded-md'>Customer ID</th>
              <th className='border border-slate-600 rounded-md'>First Name</th>
              <th className='border border-slate-600 rounded-md'>Last Name</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>NIC</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Phone</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Email</th>
              <th className='border border-slate-600 rounded-md'>Username</th>
              <th className='border border-slate-600 rounded-md'>Password</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {/* Display inventory items */}
            {filteredCustomer.map((customerItem, index) => (
              <tr key={customerItem._id} className='h-8'>
                {/* Table cells for each inventory item */}
                <td className='border border-slate-700 rounded-md text-center'>
                  {customerItem.image && (
                    <img src={customerItem.image} alt="Profile Pic" className="w-15 h-10 rounded-half" />
                  )}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>{customerItem.cusID}</td>
                <td className='border border-slate-700 rounded-md text-center'>{customerItem.firstName}</td>
                <td className='border border-slate-700 rounded-md text-center'>{customerItem.lastName}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{customerItem.NIC}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{customerItem.phone}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{customerItem.email}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{customerItem.username}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{customerItem.password}</td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {/* Operations (Info, Edit, Delete) for each inventory item */}
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/customer/get/${customerItem._id}`}>
                      <BsInfoCircle className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/customer/edit/${customerItem._id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/customer/delete/${customerItem._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
                    </Link>
                    <Link to={`/create/${customerItem.cusID}`}>
                      <button>Booking</button>
                    </Link>
                    <Link to={`/feedback/create/${customerItem.cusID}`}>
                      <button>Feedback</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowCustomer;
