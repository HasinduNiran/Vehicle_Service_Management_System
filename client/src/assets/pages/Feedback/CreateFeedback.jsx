import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../../images/t.jpg";

const CreateFeedback = () => {
  const [cussID, setCustomerID] = useState("");
  const [name, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");
  const [starRating, setStarRating] = useState(1);
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { cusID } = useParams();

  const handleSaveFeedback = async () => {
    // Validation code here

    setLoading(true);
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
    try {
      await axios.post("http://localhost:8076/feedback", data);
      setLoading(false);
      navigate("/feedback");
    } catch (error) {
      setLoading(false);
      console.error("Error creating feedback:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/customer/${cusID}`)
      .then((response) => {
        const data = response.data;
        setCustomerID(data.cusID);
        setPhoneNumber(data.phone);
        setEmail(data.email);
        setCustomerName(`${data.firstName} ${data.lastName}`);
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
        if (response.data && Array.isArray(response.data.data)) {
          setEmployees(response.data.data); // Extracting the array of employees
        } else {
          console.error(
            "Invalid response format for employees:",
            response.data
          );
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching employees:", error);
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
      border: "2px solid red",
      borderColor: "red",
      margin: "10px",
      textAlign: "center",
      position: "relative",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "0.5rem",
      fontSize: "1.2rem",
      color: "red",
      textAlign: "center",
      width: "100%",
      display: "block",
      textTransform: "uppercase",
    },
    input: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      marginBottom: "10px",
      backgroundColor: "black",
      color: "white",
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
            onChange={(e) => setCustomerName(e.target.value)}
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
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Employee</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full custom-select"
            style={styles.input}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
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