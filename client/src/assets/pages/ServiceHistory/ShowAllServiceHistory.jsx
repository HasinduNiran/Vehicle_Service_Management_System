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
            // Construct the query based on text input and date input
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
    
        // Filter based on text input
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
    
        // Filter based on date input
        let dateFilter = true;
        if (dateQuery) {
            const [queryYear, queryMonth, queryDate] = dateQuery.split('-');
            const [serviceYear, serviceMonth, serviceDate] = service.Service_Date.split('-');
            
            // Check if year, month, or date matches the query
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

    // Report generating
    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'vehicle List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Service History</h1>
                <Link to={'/ServiceHistory/create'} className="text-sky-800 text-4xl">Add history</Link>

                <div className="mb-4"></div>
                <input
                    type="text"
                    value={textSearchQuery}
                    onChange={(e) => setTextSearchQuery(e.target.value)}
                    placeholder="Enter details..."
                    className="mr-2 border border-gray-400 p-2"
                />

                <input
                    type="text"
                    value={dateSearchQuery}
                    onChange={(e) => setDateSearchQuery(e.target.value)}
                    placeholder="Enter date 2024-04-01..."
                    className="mr-2 border border-gray-400 p-2"
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Search
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <table className='w-full border-separate border-spacing-2' ref={componentRef}>
                        <thead>
                            <tr>
                                <th className='border border-green-800 rounded-md'>Customer ID</th>
                                <th className='border border-green-800 rounded-md'>Customer Name</th>
                                <th className='border border-green-800 rounded-md'>Allocated Employee</th>
                                <th className='border border-green-800 rounded-md'>Vehicle Number</th>
                                <th className='border border-green-800 rounded-md'>Milage</th>
                                <th className='border border-green-800 rounded-md'>Package</th>
                                <th className='border border-green-800 rounded-md'>Services</th>
                                <th className='border border-green-800 rounded-md'>Booking ID</th>
                                <th className='border border-green-800 rounded-md'>Next Service</th>
                                <th className='border border-green-800 rounded-md'>Service History</th>
                                <th className='border border-green-800 rounded-md'>Service Date</th>
                                <th className='border border-green-800 rounded-md'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServiceHistories.map((service, index) => (
                                <tr key={service._id}>
                                    <td className='border border-gray-600 rounded-md'>{service.cusID}</td>
                                    <td className='border border-gray-600 rounded-md'>{service.Customer_Name}</td>
                                    <td className='border border-gray-600 rounded-md'>{service.Allocated_Employee}</td>
                                    <td className='border border-gray-600 rounded-md'>{service.Vehicle_Number}</td>

                                    <td className='border border-gray-600 rounded-md'>{service.Milage}</td>

                                    <td className='border border-gray-600 rounded-md'>{service.Package}</td>
                                    <td className='border border-gray-600 rounded-md'>{service.selectedServices}</td>

                                    <td className='border border-gray-600 rounded-md'>{service.Booking_Id}</td>

                                    <td className='border border-gray-600 rounded-md'>{service.nextService}</td>

                                    <td className='border border-gray-600 rounded-md'>{service.Service_History}</td>
                                    <td className='border border-gray-600 rounded-md'>{service.Service_Date}</td>
                                    <td className='border border-gray-600 rounded-md'>
                                        <Link to={`/ServiceHistory/edit/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                                        <Link to={`/ServiceHistory/delete/${service._id}`} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>
                                        <Link to={`/ServiceHistory/get/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Show</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredServiceHistories.length === 0 && <p>No results found.</p>}
                </div>
            )}

            <div className="flex justify-center items-center mt-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                    Generate PDF
                </button>
            </div>
        </div>
    );
};
