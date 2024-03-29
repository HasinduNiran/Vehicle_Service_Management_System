import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function ShowAllServiceHistory ()  {

    const [serviceHistories, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState();

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



    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Service History</h1>
                <Link to={'/ServiceHistory/create'} className="text-sky-800 text-4xl">Add history</Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-green-800 rounded-md'>Customer Name</th>
                            <th className='border border-green-800 rounded-md'>Allocated_Employee</th>
                            <th className='border border-green-800 rounded-md'>Vehicle_Number</th>
                            <th className='border border-green-800 rounded-md'>Service_History</th>
                            <th className='border border-green-800 rounded-md'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(serviceHistories) && serviceHistories.map((service, index) => (
                            <tr key={service._id}>
                               
                                <td className='border border-gray-600 rounded-md'>{service.Customer_Name}</td>
                                <td className='border border-gray-600 rounded-md'>{service.Allocated_Employee}</td>
                                <td className='border border-gray-600 rounded-md'>{service.Vehicle_Number}</td>
                                <td className='border border-gray-600 rounded-md'>{service.Service_History}</td>

                                <td className='border border-gray-600 rounded-md'>
                                    <Link to={`/ServiceHistory/edit/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                                    <Link to={`/ServiceHistory/delete/${service._id}`} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>
                                    <Link to={`/ServiceHistory/get/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Show</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {count? (<p>{count}</p>): ''}
                </table>
                
            )}
        </div>
    );
};


