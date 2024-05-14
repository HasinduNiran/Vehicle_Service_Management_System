import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import backgroundImage from '../../images/Pback21.jpg';
import Swal from 'sweetalert2';
import BackButton from '../../components/BackButton';

const CreateInvoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [cusID, setCusID] = useState('');
  const [PaymentId, setPaymentId] = useState('');
  const [Vehicle_Number, setVehicle_Number] = useState('');
  const [Vehicle_Color, setVehicle_Color] = useState('');
  const [Model, setModel] = useState('');
  const [Year, setYear] = useState('');
  const [Engine_Details, setEngine_Details] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [Booking_Id, setBooking_Id] = useState(''); 
  const [Package, setPackage] = useState('');
  const [selectedServices, setSelectedServices] = useState('');
  const [Pamount, setPamount] = useState('');
  const [Samount, setSamount] = useState('');
  const [email, setEmail] = useState('');
  const [vehicles, setVehicles] = useState([]); 
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/vehicles')
      .then((res) => {
        setVehicles(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8076/payments')
      .then((res) => {
        setPayments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs
    if (validateForm()) {
      // Save data only if the form is valid
      handleSavePaymentInvoice();
    }
  };

  const validateForm = () => {
    // Regular expression to check if the name contains any numbers
    const nameRegex = /\d/;
    if (nameRegex.test(customerName)) {
      alert('Please enter a valid name without numbers.');
      return false;
    }
    // Add more validation rules if needed
    return true;
  };

  const handleSavePaymentInvoice = () => {
    const data = {
      customerName,
      cusID,
      PaymentId,
      Package,
      selectedServices,
      Vehicle_Number,
      Vehicle_Color,
      Model,
      Year,
      Engine_Details,
      PaymentDate,
      Pamount,
      Samount,
      totalAmount,
      Booking_Id,
      email,
    };

    setLoading(true);
    axios
      .post(`http://localhost:8076/PaymentInvoice`, data)
      .then(() => {
        setLoading(false);
        navigate('/PaymentInvoice/show');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  

  const handlePaymentIdChange = (e) => {
    const selectedPaymentId = e.target.value;
    setPaymentId(selectedPaymentId);
    // Find the payment associated with the selected Payment ID
    const selectedPayment = payments.find((payment) => payment.PaymentId === selectedPaymentId);
    if (selectedPayment) {
      // Set data from selected payment
      setVehicle_Number(selectedPayment.Vehicle_Number);
      setBooking_Id(selectedPayment.Booking_Id);
      setPaymentDate(selectedPayment.PaymentDate);
      setTotalAmount(selectedPayment.totalAmount);
      setPackage(selectedPayment.Package);
      setSelectedServices(selectedPayment.selectedServices);
      setPamount(selectedPayment.Pamount);
      setSamount(selectedPayment.Samount);
      setCusID(selectedPayment.cusID);
      setEmail(selectedPayment.email);
      // Retrieve additional data from vehicles if needed
      const selectedVehicle = vehicles.find((vehicle) => vehicle.Register_Number === selectedPayment.Vehicle_Number);
      setVehicle_Color(selectedVehicle ? selectedVehicle.Vehicle_Color : '');
      setModel(selectedVehicle ? selectedVehicle.Model : '');
      setYear(selectedVehicle ? selectedVehicle.Year : '');
      setEngine_Details(selectedVehicle ? selectedVehicle.Engine_Details: '');
    } else {
      // Clear fields if payment not found
      setVehicle_Number('');
      setVehicle_Color('');
      setModel('');
      setYear('');
      setEngine_Details('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}> 
        <h1 style={styles.heading}>
          <BackButton destination='/PaymentInvoice/show' />
          Create Invoice
        </h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
        <label htmlFor="PaymentId"style={styles.label}>Invoice Id</label>
        <select  
          value={PaymentId} 
          style={styles.select}
          onChange={handlePaymentIdChange}
          //onChange={(e) => setPaymentId(e.target.value)}
          >
          <option value=''>Select Payment ID</option>
          {
            payments.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.PaymentId}>
                {vehicle.PaymentId}
              </option>
            ))
          }
        </select>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="customerName"style={styles.label}>Customer Name</label>
         <input
          type='String'
          value={customerName}
          style={styles.input} 
          onChange={(e) => setCustomerName(e.target.value)}    
        />
      </div>
      <div style={styles.formGroup}>
      <label  htmlFor="cusID"style={styles.label}>Customer ID</label>
      <input
         style={styles.select}
         value={cusID}
         placeholder='Customer ID'
        disabled
     />
    </div>
    <div style={styles.formGroup}>

      <label  htmlFor="email"style={styles.label}>Email</label>
      <input
         style={styles.select}
         value={email}
         placeholder='Email address'
         disabled
     />
    </div>
    <div style={styles.formGroup}>

      <label  htmlFor="Vehicle_Number"style={styles.label}>Vehicle Number</label>
      <input
          style={styles.select}
          value={Vehicle_Number} 
          placeholder='Vehicle Number'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="Booking_Id"style={styles.label}>Booking ID</label>
      <input
          style={styles.select}
          value={Booking_Id} 
          placeholder='Vehicle Number'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="Vehicle_Color"style={styles.label}>Vehicle_Color</label>
      <input
          style={styles.select}
          value={Vehicle_Color} 
          placeholder='Color'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="Model"style={styles.label}>Model</label>
      <input
          style={styles.select}
          value={Model} 
          placeholder='Model'
          disabled
          />
          </div>
      <div style={styles.formGroup}>
      <label  htmlFor="Year"style={styles.label}>Year</label>
      <input
          style={styles.select}
          value={Year} 
          placeholder='Year'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="Engine_Details"style={styles.label}>Engine</label>
      <input
          style={styles.select}
          value={Engine_Details} 
          placeholder='Engine '
          disabled
          />
         </div>
      
         <div style={styles.formGroup}>
      <label  htmlFor="PaymentDate"style={styles.label}>Date</label>
      <input
          style={styles.select}
          value={PaymentDate} 
          placeholder='Payment Date'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="Package"style={styles.label}>Package</label>
      <input
          style={styles.select}
          value={Package} 
          placeholder='Package Name'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="selectedServices"style={styles.label}>Service Name</label>
      <input
          style={styles.select}
          value={selectedServices} 
          placeholder='Service Name'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="Pamount"style={styles.label}>Package Amount</label>
      <input
          style={styles.select}
          value={Pamount} 
          placeholder='Package Amount'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="Samount"style={styles.label}>Service Amount</label>
      <input
          style={styles.select}
          value={Samount} 
          placeholder='Service Amount'
          disabled
          />
         </div>
         <div style={styles.formGroup}>
      <label  htmlFor="totalAmount"style={styles.label}>Total Amount</label>
      <input
          style={styles.select}
          value={totalAmount} 
          placeholder='Total Amount'
          disabled
          />
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

export default CreateInvoice