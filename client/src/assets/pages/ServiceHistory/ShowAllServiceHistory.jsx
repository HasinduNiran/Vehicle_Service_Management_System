import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

export default function ShowAllServiceHistory() {
    const [serviceHistories, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8076/searchservices?search=${searchQuery}`);
            setServiceHistory(response.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/ServiceHistory')
            .then((res) => {
                setServiceHistory(res.data.service);
                setCount(res.data.count);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Report generating
    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'vehicle List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    const applyServiceHistoryFilter = (service) => {
        return (
            service.Customer_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.Allocated_Employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.Vehicle_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.Service_History.toLowerCase().includes(searchQuery.toLowerCase())||
            service.Service_Date.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredServiceHistories = serviceHistories.filter(applyServiceHistoryFilter);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Service History</h1>
                <Link to={'/ServiceHistory/create'} className="text-sky-800 text-4xl">Add history</Link>

                <div className="mb-4"></div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter details..."
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
                <table className='w-full border-separate border-spacing-2' ref={componentRef}>
                    <thead>
                    
                        <tr>
                            <th className='border border-green-800 rounded-md'>Customer Name</th>
                            <th className='border border-green-800 rounded-md'>Allocated_Employee</th>
                            <th className='border border-green-800 rounded-md'>Vehicle_Number</th>
                            <th className='border border-green-800 rounded-md'>Service_History</th>
                            <th className='border border-green-800 rounded-md'>Service Date</th>
                            <th className='border border-green-800 rounded-md'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(serviceHistories) && filteredServiceHistories.map((service, index) => (
                            <tr key={service._id}>

                                <td className='border border-gray-600 rounded-md'>{service.Customer_Name}</td>
                                <td className='border border-gray-600 rounded-md'>{service.Allocated_Employee}</td>
                                <td className='border border-gray-600 rounded-md'>{service.Vehicle_Number}</td>
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
                    {count ? (<p>{count}</p>) : ''}
                </table>



            )}

            <div className="flex justify-center items-center mt-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                    Generate PDF
                </button>
            </div>
        </div>
    );
};
