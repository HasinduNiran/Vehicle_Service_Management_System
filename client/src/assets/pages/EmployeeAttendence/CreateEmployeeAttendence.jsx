import React, { useState , useEffect  } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useSnackbar } from 'notistack';

const CreateEmployeeAttendence = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [Date, setDate] = useState('');
  const [InTime, setInTime] = useState('');
  const [OutTime, setOutTime] = useState('');
  const [OThours, setOThours] = useState('');
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();

  const [selectedEmployee, setSelectedEmployee] = useState({
    EmpID: '',
    employeeName: ''
  });

  const handleSaveEmployeeAttendence = () => {
    const data = {
      EmpID: selectedEmployee.EmpID,
      employeeName: selectedEmployee.employeeName,
      Date,
      InTime,
      OutTime,
      //OThours,
      
    };
    setLoading(true);
    axios
      .post('http://localhost:8076/EmployeeAttendence', data)
      .then(() => {
        setLoading(false);
        //enqueueSnackbar('Employee Created successfully', { variant: 'success' });
        navigate('/EmployeeAttendence/allEmployeeAttendence');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        //enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

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
            const selectedEmp = employees.find(emp => emp.EmpID === selectedEmpID);
            setSelectedEmployee({ ...selectedEmployee, EmpID: selectedEmpID, employeeName: selectedEmp.employeeName });
          };
        
          const handleEmployeeNameChange = (e) => {
            const selectedEmployeeName = e.target.value;
            const selectedEmp = employees.find(emp => emp.employeeName === selectedEmployeeName);
            setSelectedEmployee({ ...selectedEmployee, EmpID: selectedEmp.EmpID, employeeName: selectedEmployeeName });
          };
          

  return (
    <div className='p-4'>
      <BackButton destination='/EmployeeAttendence/allEmployeeAttendence' /> 
      <h1 className='text-3xl my-4'>Create Employee Attendence</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
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
        <label className='text-xl mr-4 text-gray-500'>employeeName</label>
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
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>InTime</label>
          <input
            type='time'
            value={InTime}
            onChange={(e) => setInTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>OutTime</label>
          <input
            type='time'
            value={OutTime}
            onChange={(e) => setOutTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        {/* <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>OThours</label>
          <input
            type='text'
            value={OThours}
            onChange={(e) => setOThours(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div> */}
        
        
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveEmployeeAttendence}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateEmployeeAttendence