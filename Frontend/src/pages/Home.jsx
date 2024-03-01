import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Spinner from '..components/Spinner';
import { Link } from 'react-router-dom';
import { AioutlineEdit } from 'react-icons'
import { BsInfoCircle } from 'react-icons';
import { MoutlineAddBox, MoutlineDelete } from 'react-icons/md';

function Home() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8076/vehicle').then((response) => {
            setLoading(false);
            setVehicles(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [])
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Vehicle List</h1>
                <Link to='/vehicle/add' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Vehicle</Link>
            </div>yyo
            {loading ? <Spinner /> : (
                <table className='w-full border-separate border-spacing-2'>

                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Register Number</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Model</th>
                            <th className='border border-slate-600 rounded-md'>Owner</th>

                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle, index) => (
                            <tr key={index} className='h-8'>
                                <td className='border border-slate-600 rounded-md text-center'>{index + 1}</td>
                                <td className='border border-slate-600 rounded-md text-center'>{vehicle.Register_Number}</td>
                                <td className='border border-slate-600 rounded-md max-md:hidden'>{vehicle.Model}</td>
                                <td className='border border-slate-600 rounded-md'>{vehicle.owner}</td>'

                            </tr>
                        ))};


                    </tbody>



                </table>
            )}

        </div>
    )
}

export default Home