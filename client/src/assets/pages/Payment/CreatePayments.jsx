import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../../images/Pback21.jpg'; // background image

const CreatePayments = () => {
 // const [PaymentId, setPaymentId] = useState('');
  const [cusID, setCusID] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [Booking_Id, setBooking_Id] = useState('');
  const [Package, setPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState('');
  const [Pamount, setPamount] = useState('');
  const [Samount, setSamount] = useState('');
  const [email, setEmail] = useState('');


  const [Servicehistory, setServiceHistory] = useState([]);
  const [Packageprice, setPackageprice] = useState([]);
  const [Serviceprice, setServiceprice] = useState([]);
  const [Customeremail, setCustomeremail] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
   // PaymentId: '',
    cusID: '',
    Vehicle_Number: '',
    PaymentDate: '',
    PaymentMethod: '',
    Booking_Id: '',
    Package: '',
    selectedServices: '',
    Pamount: '',
    Samount: '',
    email: ''
  };
  const[count, setCount] = useState();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleSavePayment();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    // if (!values.cusID) {
    //   errors.cusID = "Customer ID is required!";
    // }
    if (!values.Booking_Id) {
      errors.Booking_Id = "Service ID is required!";
    }
    if (!values.Vehicle_Number) {
      errors.Vehicle_Number = "Vehicle Number is required!";
    }
    if (!values.PaymentDate) {
      errors.PaymentDate = "Payment Date is required!";
  } else {
      const selectedDate = new Date(values.PaymentDate);
      const currentDate = new Date();
      
      // Set time components to zero to compare only dates
      selectedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
    
      if (selectedDate.getTime() !== currentDate.getTime()) {
          errors.PaymentDate = "Payment Date must be today!";
      }
  }
    // if (!values.totalAmount) {
    //   errors.totalAmount = "Total Amount is required!";
    // }
    if (!values.PaymentMethod) {
      errors.PaymentMethod = "Payment Method is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid!";
    }
  
    return errors;
  };

  const calculateTotalAmount = () => {
    return (parseFloat(formValues.Pamount) || 0) + (parseFloat(formValues.Samount) || 0);
  };

  const totalAmount = calculateTotalAmount();

  const handleSavePayment = () => {
    const data = {
      cusID: formValues.cusID,
      Booking_Id: formValues.Booking_Id,
      Vehicle_Number: formValues.Vehicle_Number,
      PaymentDate: formValues.PaymentDate,
      totalAmount: totalAmount,
      PaymentMethod: formValues.PaymentMethod,
      Package: formValues.Package,
      selectedServices: formValues.selectedServices,
      Pamount: formValues.Pamount,
      Samount: formValues.Samount,
      email: formValues.email,
    };
  
    setLoading(true);
    axios
      .post(`http://localhost:8076/payments`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Payment saved successfully!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => navigate('/payments/pdashboard'));
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to save payment!',
          footer: `<p>${error}</p>`
        });
      });
  };
  
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/ServiceHistory')
      .then((res) => {
        setServiceHistory(res.data.service);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/package')
      .then((res) => {
        setServiceprice(res.data.data);
          setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/service')
      .then((res) => {
        setPackageprice(res.data.data);
          setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/customer')
      .then((res) => {
        setCustomeremail(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleServiceIdChange = (e) => {
    const selectedBooking_Id = e.target.value;
    const selectedServiceEntry = Servicehistory.find((service) => service.Booking_Id === selectedBooking_Id);
    
    if (selectedServiceEntry) {
      setVehicle_Number(selectedServiceEntry.Vehicle_Number);
      setPackage(selectedServiceEntry.Package);
      setSelectedServices(selectedServiceEntry.selectedServices);
      setCusID(selectedServiceEntry.cusID);
    
      setFormValues({
        ...formValues,
        Booking_Id: selectedBooking_Id,
        Vehicle_Number: selectedServiceEntry.Vehicle_Number,
        Package: selectedServiceEntry.Package,
        selectedServices: selectedServiceEntry.selectedServices,
        cusID: selectedServiceEntry.cusID,
        // Fetch the package amount based on the selected package name
        Pamount: fetchPackageAmount(selectedServiceEntry.package),
        Samount: fetchServiceAmount(selectedServiceEntry.Service),
        email: fetchCustomerEmail(selectedServiceEntry.cusID),
        
        
      });
    } else {
      setBooking_Id(selectedBooking_Id);
      setVehicle_Number(''); 
      setPackage(''); 
      setSelectedServices('');
      setCusID('');
      
      setFormValues({
        ...formValues,
        Booking_Id: selectedBooking_Id,
        Vehicle_Number: '',
        Package: '',
        selectedServices: '',
        cusID: '',
        Pamount: '',
        Samount: '',
        email: ''
      });
    }
  };

  const fetchPackageAmount = (packageName) => {
    // Find the package with the given package name and return its price
    const packageData = Packageprice.find((pkg) => pkg.pakgname === packageName);
    return packageData ? packageData.Price : '';
  };
  
  const fetchServiceAmount = (serviceName) => {
    // Find the service with the given service name and return its price
    const serviceData = Serviceprice.find((skg) => skg.servgname === serviceName);
    return serviceData ? serviceData.Price : '';
  };

  const fetchCustomerEmail = (cusID) => {
    // Find the cudtomer with the given customer name and return his email
    const customerData = Customeremail.find((ckg) => ckg.cusID === cusID);
    return customerData ? customerData.email : '';
  };
  return (
   
       
    <div style={styles.container}>
      <div style={styles.formContainer}> 
      <h1 style={styles.heading}><BackButton destination='/payments/pdashboard' />Create Payment</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor='Booking_Id'style={styles.label}>Service ID</label>
            <select
              name='Booking_Id'
              style={styles.select}
              value={formValues.Booking_Id}
              onChange={handleServiceIdChange}
            >
              <option value=''>Select Service ID</option>
              {Servicehistory.map((service) => (
                <option key={service._id} value={service.Booking_Id}>
                  {service.Booking_Id}
                </option>
              ))}
            </select>
            {formErrors.Booking_Id && <p className='text-red-500'>{formErrors.Booking_Id}</p>}
          </div>
           <div style={styles.formGroup}>
            <label htmlFor='email'style={styles.label}>Email</label>
            <select
                name='email'
                style={styles.select}
                value={formValues.email}
                disabled
              >
                <option value=''>Select Email</option>
                {Customeremail.map((em) => (
                  <option key={em._id} value={em.email}>
                    {em.email}
                  </option>
                ))}
              </select>
              {formErrors.email && <p className='text-red-500'>{formErrors.email}</p>} {/* Display error message */}
          </div>
          
            <div style={styles.formGroup}>
            <label  htmlFor="Vehicle_Number"style={styles.label}>Vehicle Number</label>
           < input
              style={styles.select}
              value={Vehicle_Number}
              placeholder='Vehicle Number'
              disabled
            />
          {formErrors.Vehicle_Number && <p className='text-red-500'>{formErrors.Vehicle_Number}</p>}
          </div>
          <div style={styles.formGroup}>
            <label  htmlFor="cusID"style={styles.label}>Customer ID</label>
            <input
              style={styles.select}
              value={cusID}
              placeholder='Customer ID'
              disabled
            />
          {formErrors.cusID && <p className='text-red-500'>{formErrors.cusID}</p>}
            </div>
          <div style={styles.formGroup}>
          <label htmlFor='Package'style={styles.label}>Package</label>
            <input
              style={styles.select}
              value={Package}
              placeholder='Package'
              disabled
            />
           
          </div>
          <div style={styles.formGroup}>
          <label htmlFor='selectedServices'style={styles.label}>Service</label>
            <input
              style={styles.select}
              value={selectedServices}
              placeholder='Service'
              disabled
            />
         
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='PaymentDate'style={styles.label}>Payment Date</label>
            <input
              type='Date'
              name='PaymentDate'
              value={formValues.PaymentDate}
              onChange={handleChange}
              style={styles.input} 
            />
            {formErrors.PaymentDate && <p className='text-red-500'>{formErrors.PaymentDate}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='Pamount'style={styles.label}>Package Amount</label>
            <select
                name='Pamount'
                style={styles.select}
                value={formValues.Pamount}
                onChange={handleChange}
              >
                <option value=''>Select Price</option>
                {Packageprice.map((price) => (
                  <option key={price._id} value={price.Price}>
                    {price.Price}
                  </option>
                ))}
              </select>
            {/* {formErrors.totalAmount && <p className='text-red-500'>{formErrors.totalAmount}</p>} */}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='Samount'style={styles.label}>Service Amount</label>
            <select
                name='Samount'
                style={styles.select}
                value={formValues.Samount}
                onChange={handleChange}
              >
                <option value=''>Select Service Price</option>
                {Serviceprice.map((pric) => (
                  <option key={pric._id} value={pric.Price}>
                    {pric.Price}
                  </option>
                ))}
              </select>
            {/* {formErrors.totalAmount && <p className='text-red-500'>{formErrors.totalAmount}</p>} */}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='totalAmount'style={styles.label}>totalAmount</label>
            <input
              type='number'
              name='totalAmount'
              value={totalAmount}
              placeholder='totalAmount'
              readOnly // Make the input field read-only to prevent direct user input
              style={styles.input} 
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='PaymentMethod'style={styles.label}>Payment Method</label>
            <select
              name='PaymentMethod'
              style={styles.select}
              value={formValues.PaymentMethod}
              onChange={handleChange}
            >
              <option value=''>Select Payment Method</option>
              <option value='cash'>Cash</option>
              <option value='card'>Card</option>
            </select>
            {formErrors.PaymentMethod && <p className='text-red-500'>{formErrors.PaymentMethod}</p>}
          </div>
          <button className='p-3 bg-red-400 m-8' type='submit'>
            Save
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};
const styles = {
  select: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: 'black',

      outline: 'none'


  },
  container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
},
formContainer: {
  width: '50%',
  backgroundColor: 'rgba(5, 4, 2, 0.8)',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
  padding: '20px',
  border: '2px solid red', // Add a red border
  borderColor: 'red',
  margin: '10px',
  textAlign: 'center',
  position: 'relative', // Add this line for absolute positioning of the line
},

heading: {
  fontSize: '2rem',
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',

  marginBottom: '1.5rem',
},
form: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '500px',
  padding: '20px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '10px',
},
formGroup: {
  marginBottom: '1.5rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  borderRadius: '5px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
  color: 'rgba(255, 255, 255, 0.8)',
  backgroundColor: 'rgba(5, 4, 2, 0.8)',
},
label: {
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  flexDirection: 'column',
  fontSize: '1.2rem',
  color: 'white',
  textAlign: 'center',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center', 
  padding: '10px',
  display: 'block',
  textTransform: 'uppercase',
  backgroundColor: 'black',
},
input: {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#4A0404',
  color: 'white',
},
buttonContainer: {
  display: 'flex',
  justifyContent: 'center',
},
button: {
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '0.25rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
},
};

export default CreatePayments;
