import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const { id:cusID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const customerResponse = await axios.get(`http://localhost:8076/customer/${cusID}`);
        setCustomer(customerResponse.data);

        const bookingsResponse = await axios.get(`http://localhost:8076/bookings/${cusID}`);
        setBookings(bookingsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cusID]);

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Show Customer</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Customer Number</span>
            <span>{customer._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>First Name</span>
            <span>{customer.firstName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Name</span>
            <span>{customer.lastName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>NIC</span>
            <span>{customer.NIC}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Phone</span>
            <span>{customer.phone}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email</span>
            <span>{customer.email}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Username</span>
            <span>{customer.username}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Password</span>
            <span>{customer.password}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(customer.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(customer.updatedAt).toString()}</span>
          </div>
          {bookings.length > 0 ? (
            <table className='table'>
              <thead>
                <tr>
                  <th>Service Date</th>
                  <th>Customer Name</th>
                  <th>Vehicle Type</th>
                  <th>Vehicle Number</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.Booking_Date}</td>
                    <td>{booking.Customer_Name}</td>
                    <td>{booking.Vehicle_Type}</td>
                    <td>{booking.Vehicle_Number}</td>
                    <td>{booking.Contact_Number}</td>
                    <td>{booking.Email}</td>
                    <td>{booking.Booking_Date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No service history available for this customer.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadOneCustomer;
