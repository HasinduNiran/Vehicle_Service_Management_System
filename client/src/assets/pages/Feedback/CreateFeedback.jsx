import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../../images/t.jpg";

const CreateFeedback = () => {
  const [cussID, setCustomerID] = useState("");
  const [name, setCustomer_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setContact_Number] = useState("");
  const [employee, setEmployee] = useState("");
  const [starRating, setStarRating] = useState(1);
  const [dateOfService, setDateOfService] = useState(new Date());

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { cusID } = useParams();

  const handleSaveFeedback = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!cussID || !name || !email || !phoneNumber || !employee || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    const formattedDate = formatDate(dateOfService);
    const data = {
      cusID: cussID,
      name: name,
      email: email,
      phone_number: phoneNumber,
      employee: employee,
      date_of_service: formattedDate,
      message: message,
      star_rating: starRating,
    };
    setLoading(true);
    try {
      await axios.post("http://localhost:8076/feedback", data);
      setLoading(false);
      navigate("/feedback");
    } catch (error) {
      setLoading(false);
      console.error("Error creating feedback:", error);
      alert(
        "An error occurred while creating feedback. Please try again later."
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/customer/${cusID}`)
      .then((response) => {
        const data = response.data;
        setCustomerID(data.cusID);
        setContact_Number(data.phone);
        setEmail(data.email);
        setCustomer_Name(`${data.firstName} ${data.lastName}`);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`An error happened. Please check console`);
        console.log(error);
      });
  }, [cusID]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchEmployeesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8076/employees");
        const employeesData = response.data.data;
        if (Array.isArray(employeesData)) {
          setEmployees(employeesData);
        } else {
          console.error("Employees data is not an array:", employeesData);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeesData();
  }, []);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    formContainer: {
      width: "50%",
      backgroundColor: "rgba(5, 4, 2, 0.8)",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.8)",
      padding: "20px",
      border: "2px solid red", // Add a red border
      borderColor: "red",
      margin: "10px",
      textAlign: "center",
      position: "relative", // Add this line for absolute positioning of the line
    },
    label: {
      fontWeight: "bold",
      marginBottom: "0.5rem",
      flexDirection: "column",
      fontSize: "1.2rem",
      color: "red",
      textAlign: "center",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      display: "block",
      textTransform: "uppercase",
    },
    datePickerInput: {
      padding: "8px",
      borderRadius: "5px",
      border: "6px solid red",
      width: "1000px",
      height: "10px",
      marginBottom: "10px",
      marginTop: "10px",
      color
      : "#333",
    },
    input: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      color:'white',
      backgroundColor: "black",
 


    },
    button: {
      backgroundColor: "red",
      color: "#fff",
      border: "none",
      borderRadius: "0.25rem",
      fontWeight: "bold",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1>Create Feedback</h1>
        <div>
          <label style={styles.label}>Customer ID</label>
          <input
            type="text"
            value={cussID}
            onChange={(e) => setCustomerID(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setCustomer_Name(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setContact_Number(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Employee</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.employeeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label}>Star Rating</label>
          <select
            value={starRating}
            onChange={(e) => setStarRating(parseInt(e.target.value))}
            style={styles.input}
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label}>Date of Service</label>
          <DatePicker
            selected={dateOfService}
            onChange={(date) => setDateOfService(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input"
            color="red" 
          />
        </div>
        <div>
          <label style={styles.label}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.input}
          />
        </div>
        <button style={styles.button} onClick={handleSaveFeedback}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateFeedback;
