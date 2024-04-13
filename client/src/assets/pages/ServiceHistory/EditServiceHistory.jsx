import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditServiceHistory = () => {
  const [BookingId, setBookingId] = useState('');
  const [CusID, setCusID] = useState('');
  const [Customer_Name, setCustomer_Name] = useState('');
  const [Allocated_Employee, setAllocated_Employee] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Milage, setMilage] = useState('');
  const [Selected_Package, setSelected_Package] = useState('');
  const [Selected_Services, setSelected_Services] = useState([]);
  const [Next_Service, setNext_Service] = useState('');
  const [Service_History, setService_History] = useState('');
  const [Service_Date, setService_Date] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Validation function for Vehicle Number
  const validateVehicleNumber = (value) => {
    // Regular expression for alphanumeric with hyphen and space
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    // Check if the value matches the pattern
    return value.match(regex);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .all([
        axios.get('http://localhost:8076/employees'),
        axios.get(`http://localhost:8076/ServiceHistory/${id}`),
        axios.get('http://localhost:8076/service'),
        axios.get('http://localhost:8076/bookings')
      ])
      .then(axios.spread((employeesRes, serviceHistoryRes, serviceRes, bookingRes) => {
        setEmployees(employeesRes.data.data);
        const {
          Booking_Id:BookingId,
          cusID:CusID,
          Customer_Name,
          Allocated_Employee,
          Vehicle_Number,
          Milage,
          Package:Selected_Package,
          selectedServices:Selected_Services,
          nextService:Next_Service,
          Service_History,
          Service_Date:Service_Date
        } = serviceHistoryRes.data;
        setBookingId(BookingId);
        setCusID(CusID);
        setCustomer_Name(Customer_Name);
        setAllocated_Employee(Allocated_Employee);
        setVehicle_Number(Vehicle_Number);
        setMilage(Milage);
        setSelected_Package(Selected_Package);
        setSelected_Services(Selected_Services || []); // Ensure Selected_Services is always an array
        setNext_Service(Next_Service);
        setService_History(Service_History);
        setService_Date(Service_Date);
        setServices(serviceRes.data.data);
        setBookings(bookingRes.data);
        setLoading(false);
      }))
      .catch(error => {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleEditService = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(Vehicle_Number)) {
      alert('Please enter a valid vehicle number.');
      return;
    }

    const data = {
      Booking_Id:BookingId,
      cusID:CusID,
      Customer_Name,
      Allocated_Employee,
      Vehicle_Number,
      Milage,
      Package:Selected_Package,
      selectedServices:Selected_Services,
      nextService:Next_Service,
      Service_History,
      Service_Date:Service_Date
    };

    setLoading(true);
    try {
      await axios.put(`http://localhost:8076/ServiceHistory/${id}`, data);
      setLoading(false);
      navigate('/ServiceHistory');
    } catch (error) {
      setLoading(false);
      console.error('Error updating service history:', error);
      alert('Error updating service history. Please try again.');
    }
  };

  const handleServiceSelect = (serviceName) => {
    const isServiceSelected = Selected_Services.includes(serviceName);
    let updatedSelectedServices;

    if (isServiceSelected) {
      // If the service is already selected, remove it from the list
      updatedSelectedServices = Selected_Services.filter(service => service !== serviceName);
    } else {
      // If the service is not selected, add it to the list
      updatedSelectedServices = [...Selected_Services, serviceName];
    }

    setSelected_Services(updatedSelectedServices);
  };

  return (
    <div className='flex justify-center items-center '>
      <div className=''>
        <form onSubmit={handleEditService}>
          <h1 className='text-2xl font-bold mb-4'>Edit Service History</h1>
          <div className='mt-4'>
            <label className='block'>Booking ID</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={BookingId}
              onChange={(e) => setBookingId(e.target.value)}
              disabled
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Customer ID</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={CusID}
              onChange={(e) => setCusID(e.target.value)}
              disabled
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Customer Name</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Customer_Name}
              onChange={(e) => setCustomer_Name(e.target.value)}
            />
          </div>
          
            
          <div className='mt-4'>
            <label className='block'>Allocated Employee</label>
            <select
              className='border border-gray-600 rounded-md w-full p-2'
              value={Allocated_Employee}
              onChange={(e) => setAllocated_Employee(e.target.value)}
            >
              <option value=''>Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.employeeName}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-4'>
            <label className='block'>Vehicle Number</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Vehicle_Number}
              onChange={(e) => setVehicle_Number(e.target.value)}
              maxLength={8}
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Milage</label>
            <input
              type='number'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Milage}
              onChange={(e) => setMilage(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Selected Package</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Selected_Package}
              onChange={(e) => setSelected_Package(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Selected Services</label>
            <div className="flex flex-wrap">
              {services.map(service => (
                <button
                  key={service._id}
                  type="button" // Prevents form submission
                  className={`bg-gray-200 mr-2 mb-2 px-4 py-2 rounded ${Selected_Services.includes(service.Servicename) ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => handleServiceSelect(service.Servicename)}
                >
                  {service.Servicename}
                </button>
              ))}
            </div>
          </div>
          <div className='mt-4'>
            <label className='block'>Next Service</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Next_Service}
              onChange={(e) => setNext_Service(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Service History</label>
            <input
              type='text'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Service_History}
              onChange={(e) => setService_History(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label className='block'>Service Date</label>
            <input
              type='date'
              className='border border-gray-600 rounded-md w-full p-2'
              value={Service_Date}
              onChange={(e) => setService_Date(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              {loading ? 'Updating...' : 'Update Service History'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceHistory;
