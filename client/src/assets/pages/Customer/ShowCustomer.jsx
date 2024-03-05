import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowCustomer = () => {
  // State for inventory items and loading indicator
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch inventory items from the server on component mount
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

  return (
    <div className='p-4'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>customer List</h1>
        <Link to='/customer/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
        

      {/* Display loading spinner or inventory table */}
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              {/* Table headers */}
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>first Name</th>
              <th className='border border-slate-600 rounded-md'>last ame</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>NIC</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>phone</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>email</th>
              <th className='border border-slate-600 rounded-md'>Username</th>
              <th className='border border-slate-600 rounded-md'>password</th>
              <th className='border border-slate-600 rounded-md'>operations</th>
     
            </tr>
          </thead>
          <tbody>
            {/* Display inventory items */}
            {customer.map((customerItem, index) => (
              <tr key={customerItem._id} className='h-8'>
                {/* Table cells for each inventory item */}
                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{customerItem.firstName}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{ customerItem.lastName}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{ customerItem.NIC}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{ customerItem.phone}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{ customerItem.email}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{ customerItem.Username}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{ customerItem.password}</td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {/* Operations (Info, Edit, Delete) for each inventory item */}
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/customer/get/${ customerItem._id}`}>
                      <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/customer/edit/${ customerItem._id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/customer/delete/${ customerItem._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
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

export default ShowCustomer