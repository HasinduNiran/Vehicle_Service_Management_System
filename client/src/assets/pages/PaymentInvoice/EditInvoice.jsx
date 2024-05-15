import React, { useEffect } from "react";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import backgroundImage from '../../images/Pback21.jpg';

const EditInvoice= () => {

  const[customerName,setcustomerName] = useState('');
  const [cusID,setcusID] = useState('');
  const[PaymentId,setPaymentId] = useState('');
  const[Package,setPackage] = useState('');
  const[selectedServices,setSelectedServices] = useState('');
  const[Vehicle_Number,setVehicle_Number] = useState('');
  const[Vehicle_Color,setVehicle_Color] = useState('');
  const[Model,setModel] = useState('');
  const[Year,setYear] = useState('');
  const[Engine_Details,setEngine_Details] = useState('');
  const[PaymentDate,setPaymentDate] = useState('');
  const[Pamount,setPamount] = useState('');
  const[Samount,setSamount] = useState('');
  const[totalAmount,settotalAmount] = useState('');
  const[Booking_Id,setBooking_Id] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/PaymentInvoice/${id}`)
      .then((response) => {
        setcustomerName(response.data.customerName);
        setcusID(response.data.cusID);
        setPaymentId(response.data.PaymentId);
        setPackage(response.data.Package);
        setSelectedServices(response.data.selectedServices);
        setVehicle_Number(response.data.Vehicle_Number);
        setVehicle_Color(response.data.Vehicle_Color);
        setModel(response.data.Model);
        setYear(response.data.Year);
        setEngine_Details(response.data.Engine_Details);
        setPaymentDate(response.data.PaymentDate);
        setPamount(response.data.Pamount);
        setSamount(response.data.Samount);
        settotalAmount(response.data.totalAmount);
        setBooking_Id(response.data.Booking_Id);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred");
        console.log(error);
      });
  }, []);
  const handleEditPaymentInvoice = () => {
    const data = {
     
      customerName,
      PaymentId,
      cusID,
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
      
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/PaymentInvoice/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/PaymentInvoice/show");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened");
        console.log(err);
      });
  };
  return (
    <div style={styles.container}>
    <div style={styles.formContainer}>
      <form onSubmit={handleEditPaymentInvoice} style={styles.form}>
        <h1 style={styles.heading}>
          <BackButton destination='/PaymentInvoice/show' />
          Edit Payment Invoice
        </h1>
        <div style={styles.formGroup}>
          <label htmlFor="PaymentId" style={styles.label}>Invoice ID</label>
          <input
            type="text"
            value={PaymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="customerName" style={styles.label}>Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setcustomerName(e.target.value)}
            style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cusID" style={styles.label}>Customer ID</label>
          <div>{cusID}</div>
        </div>
      <div style={styles.formGroup}>
        <label htmlFor="Booking_Id" style={styles.label}>Service Id</label>
        {Booking_Id}
      </div><div style={styles.formGroup}>
        <label htmlFor="Vehicle_Number" style={styles.label}>Vehicle Number</label>
        <div> {Vehicle_Number}</div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Package' style={styles.label}>Package</label>
        <div>{Package}</div>
      </div><div style={styles.formGroup}>
        <label htmlFor='selectedServices' style={styles.label}>Service</label>
        <div>{selectedServices} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Vehicle_Color' style={styles.label}>Color</label>
        <div>{Vehicle_Color} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Model' style={styles.label}>Model</label>
        <div>{Model} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Year' style={styles.label}>Year</label>
        <div>{Year} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Engine_Details' style={styles.label}>Engine</label>
        <div>{Engine_Details} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='PaymentDate' style={styles.label}>Payment Date</label>
        <div>{PaymentDate} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Pamount' style={styles.label}>Package Amount</label>
        <div>{Pamount} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Samount' style={styles.label}>Service Amount</label>
        <div>{Samount} </div>
      </div><div style={styles.formGroup}>
        <label htmlFor='Samount' style={styles.label}>Total Amount</label>
        <div>{totalAmount} </div>
      </div>
      <div style={styles.formGroup}>
      <button type="submit" style={styles.submitButton}>
            {loading ? 'Updating...' : 'Update Invoice record'}
          </button>
          </div>
        </form>
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
  margin: '20px',
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
  maxWidth: '700px',
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
submitButton: {
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '0.25rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
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
export default EditInvoice;