import React, { useEffect,useState,useRef} from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import {Link} from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';
import ReportEmployee from './ReportEmployee';

function ShowEmployee() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    //search
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    //const [showType, setShowType] = useState('table');

    const componentRef = useRef();

    const handleSearch = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8076/searchEmployee?search=${searchQuery}`
          );
          setEmployees(response.data.data);
          setLoading(false);
          setError(null);
        } catch (error) {
          console.error("Error fetching employee:", error);
          setError(
            "An error occurred while fetching the employee for the search query."
          );
          setLoading(false);
        }
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

    // Filter function to apply search query filter
    const applySearchFilter = (employee) => {
        return (
            employee.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.DOB.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.NIC.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.BasicSalary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.ContactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };
    
    // Filter employee based on search query
  const filteredEmployee = employees.filter(applySearchFilter);

  return (
    <div>
      

      <div className='p-4'>
      <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee List</h1>
                
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/employees/create'}>
                        Add Employee
                    </button>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                        <ReportEmployee filteredEmployee={filteredEmployee} />
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeAttendence/allEmployeeAttendence'}>
                        Attendence
                    </button>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeSalary/allEmployeeSalary'}>
                        Employee Salary
                    </button>
                </div>


            </div>
            {loading? (<Spinner/>
            ):(

              <table className='w-full border-separate border-spacing-2' ref={componentRef}>
    <thead>
        <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>EmpID</th>
            <th className='border border-slate-600 rounded-md'>Employee Name</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>DOB</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>NIC</th>
            <th className='border border-slate-600 rounded-md'>Address</th>
            <th className='border border-slate-600 rounded-md'>Basic Salary</th>
            <th className='border border-slate-600 rounded-md'>Contact No</th>
            <th className='border border-slate-600 rounded-md'>Email</th>
            <th className='border border-slate-600 rounded-md'>Action</th>
        </tr>
    </thead>
    <tbody>
        {filteredEmployee.map((employee, index) => (

            <tr key={employee._id} className='h-8'>

                <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                    {employee.EmpID}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {employee.employeeName}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {employee.DOB}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {employee.NIC}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {employee.Address}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {employee.BasicSalary}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {employee.ContactNo}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {employee.Email}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                        <Link to={`/employees/details/${employee._id}`}>
                            <BsInfoCircle className='text-2x1 text-green-800' />
                        </Link>
                        <Link to={`/employees/edit/${employee._id}`}>
                            <AiOutlineEdit className='text-2x1 text-yellow-600' />
                        </Link>
                        <Link to={`/employees/delete/${employee._id}`}>
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
    </div>
  )
}

export default ShowEmployee