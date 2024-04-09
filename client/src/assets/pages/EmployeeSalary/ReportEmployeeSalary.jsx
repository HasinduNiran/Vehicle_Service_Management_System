import React, { useEffect,useState ,useRef} from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useReactToPrint } from 'react-to-print';


const ReportEmployeeSalary = React.forwardRef((props, ref) => {

    const [employeesSalary, setEmployeesSalary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');


    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/EmployeeSalary')
            .then((response) => {
                setEmployeesSalary(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        // Filter employeessalary based on search criteria
        const filteredSalary = employeesSalary.filter((salary) => {
            // Check if searchName and searchDate are empty or match the salary record
            return (searchName === '' || salary.employeeName.toLowerCase().includes(searchName.toLowerCase())) &&
            (searchDate === '' || salary.fromDate.includes(searchDate));
        });
        return filteredSalary;
    };

    const filteredEmployeesSalary = handleSearch();

    // Get unique employee names
    const employeeNames = [...new Set(employeesSalary.map((salary) => salary.employeeName))];

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Employee Attendance List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });
 
    const componentRef = useRef();

  return (

    
    <div className="flex">
      

      <div className='flex-1 p-4'>
      <BackButton destination='/employees/allEmployee' /> 
      <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee Salary List</h1>
                
    
                
                <div className="flex justify-center items-center mt-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeSalary/create'}>
                        Add Employee Salary
                    </button>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeSalary/reportEmployeeSalary'}>
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
                <div ref={componentRef}>
              <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>EmpID</th>
                        <th className='border border-slate-600 rounded-md'>employeeName</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>fromDate</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>toDate</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>totalOThours</th>
                        <th className='border border-slate-600 rounded-md'>totalOTpay</th>
                        <th className='border border-slate-600 rounded-md'>totalWorkedhours</th>
                        <th className='border border-slate-600 rounded-md'>totalWorkedpay</th>
                        <th className='border border-slate-600 rounded-md'>TotalSalary</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployeesSalary.map((EmployeeSalary, index) => (

                        <tr key={EmployeeSalary._id} className='h-8'>

                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {EmployeeSalary.EmpID}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {EmployeeSalary.employeeName}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {EmployeeSalary.fromDate}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {EmployeeSalary.toDate}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {EmployeeSalary.totalOThours}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {EmployeeSalary.totalOTpay}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'>
                                {EmployeeSalary.totalWorkedhours}
                            </td>
                            
                            <td className='border border-slate-700 rounded-md text-center'>
                                {EmployeeSalary.totalWorkedpay}
                            </td>

                            <td className='border border-slate-700 rounded-md text-center'>
                                {EmployeeSalary.TotalSalary}
                            </td>
                            
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        <div className="flex justify-center items-center mt-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                 Generate PDF
            </button>
        </div>
      </div>
    </div>
  )
})

export default ReportEmployeeSalary