import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeAttendence = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [InTime, setInTime] = useState('');
  const [OutTime, setOutTime] = useState('');
  const [WorkingHours, setWorkingHours] = useState('');
  const [OThours, setOThours] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // State to hold selected employee
  const [selectedEmployee, setSelectedEmployee] = useState({
    EmpID: '',
    employeeName: ''
  });

  
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/employees')
      .then((response) => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Handler to update selected employee based on EmpID change
  const handleEmpIDChange = (e) => {
    const selectedEmpID = e.target.value;
    const selectedEmp = employees.find((emp) => emp.EmpID === selectedEmpID);
    setSelectedEmployee({
      ...selectedEmployee,
      EmpID: selectedEmpID,
      employeeName: selectedEmp.employeeName,
    });
  };

  // Handler to update selected employee based on employee name change
  const handleEmployeeNameChange = (e) => {
    const selectedEmployeeName = e.target.value;
    const selectedEmp = employees.find(
      (emp) => emp.employeeName === selectedEmployeeName
    );
    setSelectedEmployee({
      ...selectedEmployee,
      EmpID: selectedEmp.EmpID,
      employeeName: selectedEmployeeName,
    });
  };

  // Handler to update InTime and calculate working hours
  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
    calculateHoursWorked(e.target.value, OutTime); // Call calculateHoursWorked
  };

  // Handler to update OutTime and calculate working hours
  const handleOutTimeChange = (e) => {
    setOutTime(e.target.value);
    calculateHoursWorked(InTime, e.target.value); // Call calculateHoursWorked
  };

  // Function to calculate working hours and overtime
  const calculateHoursWorked = (inTime, outTime) => {
    // Parsing time strings to Date objects
    const inTimeParts = inTime.split(':');
    const outTimeParts = outTime.split(':');

    const inTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(inTimeParts[0]),
      parseInt(inTimeParts[1]),
      0
    );
    const outTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(outTimeParts[0]),
      parseInt(outTimeParts[1]),
      0
    );

    // Check if time inputs are valid
    if (isNaN(inTimeDate.getTime()) || isNaN(outTimeDate.getTime())) {
      console.error('Invalid input time format');
      return;
    }

    // Calculate time difference
    const timeDiff = outTimeDate - inTimeDate;
    const hoursWorked = timeDiff / (1000 * 60 * 60);
    const normalWorkingHours = 8;

    // Update working hours and overtime hours based on hours worked
    if (hoursWorked > normalWorkingHours) {
      const overtimeHours = hoursWorked - normalWorkingHours;
      setOThours(overtimeHours.toFixed(2));
      setWorkingHours(normalWorkingHours.toFixed(2));
    } else {
      setOThours('0.00');
      setWorkingHours(hoursWorked.toFixed(2));
    }
  };

  // Handler to save employee attendance
  const handleSaveEmployeeAttendence = () => {
    const data = {
      EmpID: selectedEmployee.EmpID,
      employeeName: selectedEmployee.employeeName,
      date: selectedDate,
      InTime,
      OutTime,
      WorkingHours,
      OThours,
    };
    setLoading(true);
    axios
      .post('http://localhost:8076/EmployeeAttendence', data)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeAttendence/allEmployeeAttendence');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // Handler to record current time as InTime
  const handleRecordInTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newInTime = `${hours}:${minutes}`;
    setInTime(newInTime);
    calculateHoursWorked(newInTime, OutTime); // Recalculate hours worked
  };
  
  // Handler to record current time as OutTime
  const handleRecordOutTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newOutTime = `${hours}:${minutes}`;
    setOutTime(newOutTime);
    calculateHoursWorked(InTime, newOutTime); // Recalculate hours worked
  };
  

  return (
    <div className='p-4'>
      <BackButton destination='/EmployeeAttendence/allEmployeeAttendence' />
      <h1 className='text-3xl my-4'>Create Employee Attendence</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex justify-center space-x-8'>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>EmpID</label>
            <select
              value={selectedEmployee.EmpID}
              onChange={handleEmpIDChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            >
              <option value=''>Select EmpID</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.EmpID}>
                  {employee.EmpID}
                </option>
              ))}
            </select>
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Employee Name</label>
            <select
              value={selectedEmployee.employeeName}
              onChange={handleEmployeeNameChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            >
              <option value=''>Select Employee Name</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.employeeName}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Date</label>
            <input
              type='Date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          
        </div>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
          
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>InTime</label>
            <input
              type='time'
              value={InTime}
              onChange={handleInTimeChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
            <button
              onClick={handleRecordInTime}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
              Record Current Time
            </button>
          </div>
          
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>OutTime</label>
            <input
              type='time'
              value={OutTime}
              onChange={handleOutTimeChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
            <button
              onClick={handleRecordOutTime}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
              Record Current Time
            </button>
          </div>
          
          
          
        </div>

        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
            
          
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Working Hours</label>
            <input
              type='text'
              value={WorkingHours}
              readOnly
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Overtime Hours</label>
            <input
              type='text'
              value={OThours}
              readOnly
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          </div>

      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='p-2 bg-sky-300 m-2'
          style={{ width: '150px' }}
          onClick={handleSaveEmployeeAttendence}
        >
          Save
        </button>
      </div>


    </div>
  );
};

export default CreateEmployeeAttendence;
