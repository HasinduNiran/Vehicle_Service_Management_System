import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useReactToPrint } from 'react-to-print';

function ShowEmployeeAttendence() {
    const [employeesAttendance, setEmployeesAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const componentRef = useRef();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/EmployeeAttendence')
            .then((response) => {
                setEmployeesAttendance(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Report generating
    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Employee Attendence List',
        //onAfterPrint: () => alert('Data saved in PDF'),
    });

    const handleSearch = () => {
        // Filter employeesAttendance based on search criteria
        return employeesAttendance.filter((attendance) => {
            // Check if searchName and searchDate are empty or match the attendance record
            return (searchName === '' || attendance.employeeName.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || attendance.Date.includes(searchDate));
        });
    };

    const filteredEmployeesAttendance = handleSearch();

    // Helper function to calculate overtime hours
    const calculateOvertime = (inTime, outTime) => {
        const inTimeDate = new Date(`01/01/2000 ${inTime}`);
        const outTimeDate = new Date(`01/01/2000 ${outTime}`);

        // Calculate time difference in milliseconds
        const timeDiff = outTimeDate - inTimeDate;

        // Convert time difference to hours
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        // Subtract normal working hours (8 hours) to get overtime hours
        const overtimeHours = Math.max(hoursDiff - 8, 0); // Ensure overtime is non-negative

        return overtimeHours;
    };

    return (
        <div className="flex">
            <div className='flex-1 p-4'>
            <BackButton destination='/EmployeeAttendence/allEmployeeAttendence' /> 
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Employee Attendance List</h1>
                    
                </div>
                <div className='flex  justify-between mb-4'>
                    <div className='flex items-center'> {/* Wrap select and input in a flex container */}
                        <select
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className='p-2 border border-gray-300 rounded mr-2' >
                            <option value=''>All Employees</option>
                            {[...new Set(employeesAttendance.map((attendance) => attendance.employeeName))].map((name, index) => (
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
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <table className='w-full border-separate border-spacing-2' ref={componentRef}>
                            <thead>
                                <tr>
                                    <th className='border border-slate-600 rounded-md'>No</th>
                                    <th className='border border-slate-600 rounded-md'>EmpID</th>
                                    <th className='border border-slate-600 rounded-md'>employeeName</th>
                                    <th className='border border-slate-600 rounded-md max-md:hidden'>Date</th>
                                    <th className='border border-slate-600 rounded-md max-md:hidden'>InTime</th>
                                    <th className='border border-slate-600 rounded-md'>OutTime</th>
                                    <th className='border border-slate-600 rounded-md'>OThours</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployeesAttendance.map((EmployeeAttendance, index) => (
                                    <tr key={EmployeeAttendance._id} className='h-8'>
                                        <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>{EmployeeAttendance.EmpID}</td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{EmployeeAttendance.employeeName}</td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{EmployeeAttendance.Date}</td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{EmployeeAttendance.InTime}</td>
                                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{EmployeeAttendance.OutTime}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>{calculateOvertime(EmployeeAttendance.InTime, EmployeeAttendance.OutTime)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* report button */}
                        <div className="flex justify-center items-center mt-8">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                                Generate PDF
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ShowEmployeeAttendence;
