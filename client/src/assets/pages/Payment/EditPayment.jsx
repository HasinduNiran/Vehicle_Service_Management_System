import React, { useEffect } from "react";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import backgroundImage from '../../images/Pback21.jpg'; // background image

const EditPayment = () => {
  const [PaymentId, setPaymentId] = useState("");
  const [cusID, setCusID] = useState("");
  const [Vehicle_Number, setVehicle_Number] = useState("");
  const [Package, setPackage] = useState("");
  const [selectedServices, setSelectedServices] = useState("");
  const [PaymentDate, setPaymentDate] = useState("");
  const [Pamount, setPamount] = useState("");
  const [Samount, setSamount] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [Booking_Id, setBooking_Id] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/payments/${id}`)
      .then((response) => {
        const data = response.data;
        setPaymentId(data.PaymentId);
        setCusID(data.cusID);
        setVehicle_Number(data.Vehicle_Number);
        setPackage(data.Package);
        setSelectedServices(data.selectedServices);
        setPaymentDate(data.PaymentDate);
        setPamount(data.Pamount);
        setSamount(data.Samount);
        setPaymentMethod(data.PaymentMethod);
        setBooking_Id(data.Booking_Id);
        setEmail(data.email);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred");
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    const total = (parseFloat(Pamount) || 0) + (parseFloat(Samount) || 0);
    settotalAmount(total);
  }, [Pamount, Samount]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  
//validation
const handleEditPayment = async (e) => {
  e.preventDefault();
  if (!email || !totalAmount || !PaymentMethod) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all required fields.',
    });
    return;
  }
  if (!validateEmail(email)) {
    setEmailError("Please enter a valid email address.");
    return;
  }

  setEmailError("");

  const data = {
    PaymentId,
    cusID,
    Vehicle_Number,
    Booking_Id,
    Package,
    selectedServices,
    PaymentDate,
    Pamount,
    Samount,
    totalAmount,
    PaymentMethod,
    email,
  };

  setLoading(true);
  axios
    .put(`http://localhost:8076/payments/${id}`, data)
    .then(() => {
      setLoading(false);
      navigate("/payments/pdashboard");
    })
    .catch((err) => {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error happened',
      });
      console.log(err);
    });
};


  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form onSubmit={handleEditPayment} style={styles.form}>
          <h1 style={styles.heading}>
            <BackButton destination='/payments/pdashboard' />
            Edit Payment
          </h1>
          <div style={styles.formGroup}>
            <label htmlFor="PaymentId" style={styles.label}>PaymentId</label>
            <div>{PaymentId}</div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="String"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
             {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='Booking_Id' style={styles.label}>Service ID</label>
            <div>{Booking_Id}</div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="cusID" style={styles.label}>Customer ID</label>
            <div>{cusID}</div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='Package' style={styles.label}>Package</label>
            <div>{Package}</div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='selectedServices' style={styles.label}>Service</label>
            <div>{selectedServices}</div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="Vehicle_Number" style={styles.label}>Vehicle Number</label>
            <div>{Vehicle_Number}</div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="Pamount" style={styles.label}>Package Amount</label>
            <input
              type="number"
              value={Pamount}
              onChange={(e) => setPamount(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="Samount" style={styles.label}>Service Amount</label>
            <input
              type="number"
              value={Samount}
              onChange={(e) => setSamount(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="totalAmount" style={styles.label}>Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              readOnly
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="PaymentMethod" style={styles.label}>Payment Method</label>
            <select
              value={PaymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <button
              type="submit"
              style={styles.submitButton}
            >
              {loading ? 'Updating...' : 'Update Payment record'}
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
export default EditPayment;
