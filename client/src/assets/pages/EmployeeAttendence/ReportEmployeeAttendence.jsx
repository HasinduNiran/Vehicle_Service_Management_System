import React, { useEffect,useState} from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import {Link} from 'react-router-dom';


function ShowEmployeeAttendence() {

    const [employeesAttendence, setEmployeesAttendence] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');
    
    //const [showType, setShowType] = useState('table');


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

    const handleSearch = () => {
        // Filter employeesAttendance based on search criteria
        const filteredAttendence = employeesAttendence.filter((attendance) => {
            // Check if searchName and searchDate are empty or match the attendance record
            return (searchName === '' || attendance.employeeName.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || attendance.Date.includes(searchDate));
        });
        return filteredAttendence;
    };

    const filteredEmployeesAttendence = handleSearch();

    // Get unique employee names
    const employeeNames = [...new Set(employeesAttendence.map((attendance) => attendance.employeeName))];



  return (

    
    <div className="flex">
      

      <div className='flex-1 p-4'>
      <BackButton destination='/EmployeeAttendence/allEmployeeAttendence' /> 
      <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee Attendence List</h1>
                
    
                
                <div className="flex justify-center items-center mt-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeAttendence/create'}>
                        Add Employee Attendence
                    </button>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeAttendence/reportEmployeeAttendence'}>
                        Report
                    </button>
                </div>
            </div>

        <div className='flex  justify-between mb-4'>
            <div className='flex items-center'> {/* Wrap select and input in a flex container */}
                <select
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className='p-2 border border-gray-300 rounded mr-2' >
                        
                    <option value=''>All Employees</option>
                    {employeeNames.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <input
                    type='month'
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className='p-2 border border-gray-300 rounded'/>
            </div>
        </div>



            {loading? (<Spinner/>
            ):(

              <table className='w-full border-separate border-spacing-2'>
    <thead>
        <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>EmpID</th>
            <th className='border border-slate-600 rounded-md'>employeeName</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Date</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>InTime</th>
            <th className='border border-slate-600 rounded-md'>OutTime</th>
            <th className='border border-slate-600 rounded-md'>Workinghours</th>
            <th className='border border-slate-600 rounded-md'>OThours</th>
            
        </tr>
    </thead>
    <tbody>
        {filteredEmployeesAttendence.map((EmployeeAttendence, index) => (

            <tr key={EmployeeAttendence._id} className='h-8'>

                <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeAttendence.EmpID}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.employeeName}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.Date}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.InTime}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {EmployeeAttendence.OutTime}
                </td>

                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeAttendence.WorkingHours}
                </td>
                
                <td className='border border-slate-700 rounded-md text-center'>
                    {EmployeeAttendence.OThours}
                </td>
                
                
              </tr>
        ))}
    </tbody>
</table>
            )}
        
      </div>
    </div>
  )
}

export default ShowEmployeeAttendence