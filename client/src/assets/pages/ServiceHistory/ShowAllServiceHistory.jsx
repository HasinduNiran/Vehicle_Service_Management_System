import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const ShowAllServiceHistory = () => {

    const [serviceHistories, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/ServiceHistory')
            .then((res) => {
                setServiceHistory(res.data);
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
                        {serviceHistories.map((serviceHistories) => (
                            <tr key={serviceHistories._id}>
                                <td className='border border-gray-600 rounded-md'>{serviceHistories.Customer_Name}</td>
                                <td className='border border-gray-600 rounded-md'>{serviceHistories.Allocated_Employee}</td>
                                <td className='border border-gray-600 rounded-md'>{serviceHistories.Vehicle_Number}</td>
                                <td className='border border-gray-600 rounded-md'>{serviceHistories.Service_History}</td>

                                <td className='border border-gray-600 rounded-md'>
                                    <Link to={`/ServiceHistory/edit/${serviceHistories._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                                    <Link to={`/ServiceHistory/delete/${serviceHistories._id}`} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</Link>
                                    <Link to={`/ServiceHistory/get/${history._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Show</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowAllServiceHistory
