import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [serviceHistories, setServiceHistory] = useState([]);

  const { id: cusID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const customerResponse = await axios.get(`http://localhost:8076/customer/${cusID}`);
        setCustomer(customerResponse.data);

        const bookingsResponse = await axios.get(`http://localhost:8076/bookings/${cusID}`);
        setBookings(bookingsResponse.data);

        const paymentResponse = await axios.get(`http://localhost:8076/payments/${cusID}`);
        setPayments(paymentResponse.data);

        const vehicleResponse = await axios.get(`http://localhost:8076/vehicles/${cusID}`);
        setVehicles(vehicleResponse.data);

        const ServiceHistoryResponse = await axios.get(`http://localhost:8076/ServiceHistory/${cusID}`);
        setServiceHistory(ServiceHistoryResponse.data);

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
            <div>
              <h2 className='text-2xl my-4'>Bookings</h2>
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
            </div>
          ) : (
            <p>No bookings available for this customer.</p>
          )}

          {payments.length > 0 ? (
            <div>
              <h2 className='text-2xl my-4'>Payments</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.PaymentId}</td>
                      <td>{payment.PaymentDate}</td>
                      <td>{payment.totalAmount}</td>
                      <td>{payment.PaymentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No payment history available for this customer.</p>
          )}

          {vehicles.length > 0 ? (
            <div>
              <h2 className='text-2xl my-4'>Vehicles</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Vehicle Number</th>
                    <th>Vehicle Make</th>
                    <th>Vehicle Model</th>
                    <th>Vehicle Year</th>
                    <th>Engine Details</th>
                    <th>Transmission Details</th>
                    <th>Vehicle Color</th>
                    <th>Vehicle Features</th>
                    <th>Condition Assessment</th>
                    <th>Vehicle Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle, index) => (
                    <tr key={index}>
                      <td>{vehicle.Register_Number}</td>
                      <td>{vehicle.Make}</td>
                      <td>{vehicle.Model}</td>
                      <td>{vehicle.Year}</td>
                      <td>{vehicle.Engine_Details}</td>
                      <td>{vehicle.Transmission_Details}</td>
                      <td>{vehicle.Vehicle_Color}</td>
                      <td>{vehicle.Vehicle_Features.join(', ')}</td>
                      <td>{vehicle.Condition_Assessment}</td>
                      <td>{vehicle.Owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No vehicle detail available for this customer.</p>
          )}

          {serviceHistories.length > 0 ? (
            <div>
              <h2 className='text-2xl my-4'>Service Histories</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Allocated Employee</th>
                    <th>Vehicle Number</th>
                    <th>Service History</th>
                    <th>Service Date</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceHistories.map((service, index) => (
                    <tr key={index}>
                      <td>{service.Customer_Name}</td>
                      <td>{service.Allocated_Employee}</td>
                      <td>{service.Vehicle_Number}</td>
                      <td>{service.Service_History}</td>
                      <td>{service.Service_Date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No service details available for this customer.</p>
          )}


        </div>
      )}
    </div>
  );
};

export default ReadOneCustomer;
