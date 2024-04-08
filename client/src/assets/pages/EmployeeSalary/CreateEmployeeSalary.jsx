import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeSalary = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [fromDate, setfromDate] = useState('');
  const [toDate, settoDate] = useState('');
  const [totalOThours, settotalOThours] = useState('');
  const [totalOTpay, settotalOTpay] = useState('');
  const [totalWorkedhours, settotalWorkedhours] = useState('');
  const [totalWorkedpay, settotalWorkedpay] = useState('');
  const [TotalSalary, setTotalSalary] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeesAttendence, setEmployeesAttendence] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState({
    EmpID: '',
    employeeName: ''
  });

  const [includeEPF, setIncludeEPF] = useState(false); // State to track EPF selection

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

  const handleEmpIDChange = (e) => {
    const selectedEmpID = e.target.value;
    const selectedEmp = employees.find((emp) => emp.EmpID === selectedEmpID);
    setSelectedEmployee({
      ...selectedEmployee,
      EmpID: selectedEmpID,
      employeeName: selectedEmp.employeeName,
    });
  };

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

  // calculate total OT hours
  const calculateTotalOvertimeHours = () => {
    const filteredAttendance = employeesAttendence.filter(
      (attendance) =>
        attendance.EmpID === selectedEmployee.EmpID &&
        attendance.date >= fromDate &&
        attendance.date <= toDate
    );

    const totalOvertimeHours = filteredAttendance.reduce(
      (total, attendance) => total + attendance.OThours,
      0
    );

    // Set the total overtime hours state
    settotalOThours(totalOvertimeHours);
  };

  // calculate total Worked hours
  const calculateTotalWorkedhours = () => {
    const filteredAttendance = employeesAttendence.filter(
      (attendance) =>
        attendance.EmpID === selectedEmployee.EmpID &&
        attendance.date >= fromDate &&
        attendance.date <= toDate
    );

    const totalWorkedhours = filteredAttendance.reduce(
      (total, attendance) => total + attendance.WorkingHours,
      0
    );

    // Set the total Worked hours state
    settotalWorkedhours(totalWorkedhours);
  };

  // Calculate totalOTpay and totalWorkedpay
  const calculatedTotalOTpay = () => {
    const calculatedTotalOTpay = totalOThours * 585;
    settotalOTpay(calculatedTotalOTpay);
  };

  const calculatedTotalWorkedpay = () => {
    const calculatedTotalWorkedpay = totalWorkedhours * 390;
    settotalWorkedpay(calculatedTotalWorkedpay);
  };

  // Calculate totalSalary including EPF if selected
  const calculatedTotalSalary = () => {
    let totalSalary = totalOTpay + totalWorkedpay;
    if (includeEPF) {
      // Include EPF,8%
      const epfAmount = totalSalary * 0.08;
      totalSalary -= epfAmount;
    }
    setTotalSalary(totalSalary);
  };

  const handleSaveEmployeeSalary = () => {
    calculateTotalOvertimeHours();
    calculateTotalWorkedhours();
    calculatedTotalSalary(); // Calculate total salary including EPF

    const data = {
      EmpID: selectedEmployee.EmpID,
      employeeName: selectedEmployee.employeeName,
      fromDate,
      toDate,
      totalOThours, // Include totalOThours in the data sent to the server
      totalOTpay,
      totalWorkedhours,
      totalWorkedpay,
      TotalSalary
    };
    setLoading(true);
    axios
      .post('http://localhost:8076/EmployeeSalary', data)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeSalary/allEmployeeSalary');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/EmployeeAttendence')
      .then((response) => {
        setEmployeesAttendence(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton destination='/EmployeeSalary/allEmployeeSalary' />
      <h1 className='text-3xl my-4'>Create Employee Salary</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex justify-center space-x-8'>
        <div className='flex space-x-4'>
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
              <label className='text-xl mr-4 text-gray-500'>fromDate</label>
              <input
                type='Date'
                value={fromDate}
                onChange={(e) => setfromDate(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>toDate</label>
              <input
                type='Date'
                value={toDate}
                onChange={(e) => settoDate(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
          </div>

          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>totalOThours</label>
              <input
                type='text'
                value={totalOThours} // Display totalOThours
                readOnly
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
              {/* Button to calculate totalOThours */}
              <button className='p-2 bg-sky-300 m-2' onClick={calculateTotalOvertimeHours}>
                Calculate Total OT Hours
              </button>
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>totalWorkedhours</label>
              <input
                type='text'
                value={totalWorkedhours}
                readOnly
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
              {/* Button to calculate totalWorkedhours */}
              <button className='p-2 bg-sky-300 m-2' onClick={calculateTotalWorkedhours}>
                Calculate Total Worked hours
              </button>
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>EPF</label>
              <button
                className={`p-2 bg-sky-300 m-2 ${includeEPF ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={() => setIncludeEPF(!includeEPF)}
              >
                {includeEPF ? 'EPF Included' : 'EPF Excluded'}
              </button>
            </div>
          </div>

          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[300px] p-4'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>totalOTpay</label>
              <input
                type='text'
                value={totalOTpay}
                readOnly
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
              {/* Button to calculate totalOTpay */}
              <button className='p-2 bg-sky-300 m-2' onClick={calculatedTotalOTpay}>
                Calculate Total OT Pay
              </button>
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>totalWorkedpay</label>
              <input
                type='text'
                value={totalWorkedpay }
                readOnly
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
              {/* Button to calculate totalWorkedpay */}
              <button className='p-2 bg-sky-300 m-2' onClick={calculatedTotalWorkedpay}>
                Calculate Total Worked Pay
              </button>
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>TotalSalary</label>
              <input
                type='text'
                value={TotalSalary}
                readOnly
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
              {/* Button to calculate TotalSalary */}
              <button className='p-2 bg-sky-300 m-2' onClick={calculatedTotalSalary}>
                Calculate Total Salary
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='p-2 bg-sky-300 m-2'
          style={{ width: '150px' }}
          onClick={handleSaveEmployeeSalary}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateEmployeeSalary;
