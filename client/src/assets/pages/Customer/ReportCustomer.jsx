import React, { useEffect, useState, useRef } from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useReactToPrint } from 'react-to-print';

const ReportCustomer = React.forwardRef((props, ref) => {
    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8076/customer');
                setCustomer(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching customers:", error);
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8076/searchCustomer?search=${searchQuery}`);
            setCustomer(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching customers:", error);
            setLoading(false);
        }
    };

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Customer List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    const applySearchFilter = (customer) => {
        return (
            customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.NIC.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.Username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredCustomer = customer.filter(applySearchFilter);

    // Function to generate the next cusID
    const generateCusID = (index) => {
        return `CUS${index + 1}`;
    };

    return (
        <div ref={ref}>
            <div className="p-4">
                <BackButton destination='/customer/allCustomer' />
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl my-8">Customer List</h1>
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
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <table className="w-full border-separate border-spacing-2" ref={componentRef}>
                            <thead>
                                <tr>
                                    <th className='border border-slate-600 rounded-md'>cusID</th>
                                    <th className='border border-slate-600 rounded-md'>First Name</th>
                                    <th className='border border-slate-600 rounded-md'>Last Name</th>
                                    <th className='border border-slate-600 rounded-md'>NIC</th>
                                    <th className='border border-slate-600 rounded-md'>Phone</th>
                                    <th className='border border-slate-600 rounded-md'>Email</th>
                                 </tr>
                            </thead>
                            <tbody>
                                {filteredCustomer.map((customerItem, index) => (
                                    <tr key={customerItem._id} className="h-8">
                                        <td className="border border-slate-700 rounded-md text-center">{generateCusID(index)}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customerItem.firstName}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customerItem.lastName}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customerItem.NIC}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customerItem.phone}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{customerItem.email}</td>
                                     </tr>
                                ))}
                            </tbody>
                        </table>
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
});

export default ReportCustomer;
