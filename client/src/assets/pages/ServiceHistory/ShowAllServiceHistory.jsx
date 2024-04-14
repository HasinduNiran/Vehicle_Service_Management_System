import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

export default function ShowAllServiceHistory() {
    const [serviceHistories, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [textSearchQuery, setTextSearchQuery] = useState("");
    const [dateSearchQuery, setDateSearchQuery] = useState("");
    const componentRef = useRef();

    useEffect(() => {
        fetchServiceHistories();
    }, []);

    const fetchServiceHistories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8076/ServiceHistory');
            setServiceHistory(response.data.service);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const searchTextQuery = textSearchQuery.toLowerCase();
            const response = await axios.get(`http://localhost:8076/searchservices?search=${searchTextQuery}&date=${dateSearchQuery}`);
            setServiceHistory(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const applyServiceHistoryFilter = (service) => {
        const textQuery = textSearchQuery.toLowerCase();
        const dateQuery = dateSearchQuery;
    
        const textFilter = (
            (service.Customer_Name && service.Customer_Name.toLowerCase().includes(textQuery)) ||
            (service.Allocated_Employee && service.Allocated_Employee.toLowerCase().includes(textQuery)) ||
            (service.Vehicle_Number && service.Vehicle_Number.toLowerCase().includes(textQuery)) ||
            (service.Service_History && service.Service_History.toLowerCase().includes(textQuery)) ||
            (typeof service.Milage === 'string' && service.Milage.toLowerCase().includes(textQuery)) ||
            (service.Package && service.Package.toLowerCase().includes(textQuery)) ||
            (service.Booking_Id && service.Booking_Id.toLowerCase().includes(textQuery)) ||
            (service.Service_Date && service.Service_Date.toLowerCase().includes(textQuery)) ||
            (service.nextService && service.nextService.toLowerCase().includes(textQuery)) ||
            (service.Servicename && service.Servicename.toLowerCase().includes(textQuery)) ||
            (service.Month && service.Month.toLowerCase().includes(textQuery))
        );
    
        let dateFilter = true;
        if (dateQuery) {
            const [queryYear, queryMonth, queryDate] = dateQuery.split('-');
            const [serviceYear, serviceMonth, serviceDate] = service.Service_Date.split('-');
            
            if (queryYear) {
                dateFilter = dateFilter && (serviceYear === queryYear);
            }
            if (queryMonth) {
                dateFilter = dateFilter && (serviceMonth === queryMonth);
            }
            if (queryDate) {
                dateFilter = dateFilter && (serviceDate === queryDate);
            }
        }
    
        return textFilter && dateFilter;
    };
    

    const filteredServiceHistories = serviceHistories.filter(applyServiceHistoryFilter);

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'vehicle List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl">Service History</h1>
                <Link to={'/ServiceHistory/create'} className='text-green-600 mr-2 hover:text-green-800'>Add History</Link>
                <div className="flex">
                    <input
                        type="text"
                        value={textSearchQuery}
                        onChange={(e) => setTextSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="mr-4 px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                    <input
                        type="text"
                        value={dateSearchQuery}
                        onChange={(e) => setDateSearchQuery(e.target.value)}
                        placeholder="Enter Date (YYYY-MM-DD)"
                        className="mr-4 px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                    >
                        Search
                    </button>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <table className='w-full border-collapse border border-gray-300' ref={componentRef}>
                        <thead>
                            <tr>
                                <th className='border border-gray-300 p-3'>Customer ID</th>
                                <th className='border border-gray-300 p-3'>Customer Name</th>
                                <th className='border border-gray-300 p-3'>Allocated Employee</th>
                                <th className='border border-gray-300 p-3'>Vehicle Number</th>
                                <th className='border border-gray-300 p-3'>Milage</th>
                                <th className='border border-gray-300 p-3'>Package</th>
                                <th className='border border-gray-300 p-3'>Services</th>
                                <th className='border border-gray-300 p-3'>Booking ID</th>
                                <th className='border border-gray-300 p-3'>Next Service</th>
                                <th className='border border-gray-300 p-3'>Service History</th>
                                <th className='border border-gray-300 p-3'>Service Date</th>
                                <th className='border border-gray-300 p-3'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServiceHistories.map((service, index) => (
                                <tr key={service._id}>
                                    <td className='border border-gray-300 p-3'>{service.cusID}</td>
                                    <td className='border border-gray-300 p-3'>{service.Customer_Name}</td>
                                    <td className='border border-gray-300 p-3'>{service.Allocated_Employee}</td>
                                    <td className='border border-gray-300 p-3'>{service.Vehicle_Number}</td>
                                    <td className='border border-gray-300 p-3'>{service.Milage}</td>
                                    <td className='border border-gray-300 p-3'>{service.Package}</td>
                                    <td className='border border-gray-300 p-3'>{service.selectedServices}</td>
                                    <td className='border border-gray-300 p-3'>{service.Booking_Id}</td>
                                    <td className='border border-gray-300 p-3'>{service.nextService}</td>
                                    <td className='border border-gray-300 p-3'>{service.Service_History}</td>
                                    <td className='border border-gray-300 p-3'>{service.Service_Date}</td>
                                    <td className='border border-gray-300 p-3'>
                                        <Link to={`/ServiceHistory/edit/${service._id}`} className='text-green-600 mr-2 hover:text-green-800'>Edit</Link>
                                        <Link to={`/ServiceHistory/delete/${service._id}`} className='text-red-600 mr-2 hover:text-red-800'>Delete</Link>
                                        <Link to={`/ServiceHistory/get/${service._id}`} className='text-blue-600 hover:text-blue-800'>Show</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredServiceHistories.length === 0 && <p className="mt-4">No results found.</p>}
                </div>
            )}

            <div className="flex justify-center items-center mt-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md" onClick={generatePDF}>
                    Generate PDF
                </button>
            </div>
        </div>
    );
};
