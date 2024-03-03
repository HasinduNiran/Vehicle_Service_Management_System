import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import BackButton from '../components/BackButton';
import Spinner from '../../components/Spinner';

const ReadOneEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      {/* <BackButton /> */}
      <h1 className='text-3xl my-4'>Show Employee</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>EmpID</span>
            <span>{employee.EmpID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>employeeName</span>
            <span>{employee.employeeName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>DOB</span>
            <span>{employee.DOB}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>NIC</span>
            <span>{employee.NIC}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Address</span>
            <span>{employee.Address}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Position</span>
            <span>{employee.Position}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Salary</span>
            <span>{employee.Salary}</span>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ReadOneEmployee;