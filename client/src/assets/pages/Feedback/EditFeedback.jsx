import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../../images/t.jpg";
import { FaBolt, FaStar } from "react-icons/fa";

const EditFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [starRating, setStarRating] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [feedbackId, setFeedbackId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchFeedbackData();
      fetchEmployeesData();
    }
  }, [id]);

  const fetchFeedbackData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/feedback/${id}`)
      .then((response) => {
        const {
          _id,
          name,
          email,
          phone_number,
          employee,
          date_of_service,
          message,
          star_rating,
        } = response.data;
        setFeedbackId(_id);
        setName(name);
        setEmail(email);
        setPhoneNumber(phone_number);
        setEmployee(employee);
        setDateOfService(new Date(date_of_service));
        setMessage(message);
        setStarRating(star_rating);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        alert(
          "An error occurred while fetching feedback. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchEmployeesData = () => {
    axios
      .get("http://localhost:8076/employees")
      .then((response) => {
        const employeesData = response.data.data;
        setEmployees(employeesData);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleSaveFeedback = () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    setEmailError("");
    setPhoneNumber("");

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !employee ||
      !dateOfService ||
      !message
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const data = {
      name,
      email,
      phone_number: phoneNumber,
      employee,
      date_of_service: dateOfService.toISOString(),
      message,
      star_rating: starRating,
    };

    setLoading(true);
    axios
      .put(`http://localhost:8076/feedback/${feedbackId}`, data)
      .then(() => {
        navigate(`/customer/get/${cusID}`);
      })
      .catch((error) => {
        console.error("Error updating feedback:", error);
        alert(
          "An error occurred while saving feedback. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const Spinner = () => {
    return <div className="spinner"></div>;
  };

  const renderStars = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < starRating ? "star-filled" : "star-empty"}
            onMouseOver={() => handleStarHover(index)}
            onClick={() => handleStarClick(index)}
            style={{
              color: index < starRating ? "red" : "gray",
              height: "50px",width:"50px",
            }}
          />
        ))}
      </div>
    );
  };

  const handleStarClick = (index) => {
    setStarRating(index + 1);
  };

  const handleStarHover = (index) => {
    setStarRating(index + 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <a href="/feedback" style={styles.button}>
          Back to Feedback
        </a>
        <div>
        <h1 style={styles.heading}>Edit Feedback</h1>
        {loading && <Spinner />}
        </div>
        <div className="p-4">
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            className={` ${emailError && "border-red-500"}`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
          <div className="p-4">
            <label style={styles.label}>Employee</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full custom-select"
              style={styles.input}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.employeeName}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>Star Rating</label>
            {renderStars()}
          </div>
          <label style={styles.label}>Date Of Service</label>
          <DatePicker
            selected={dateOfService}
            onChange={(date) => setDateOfService(date)}
            className="date-picker-input text-black" 
          />
          <label style={styles.label}>Message</label>
          <input
            type="text"
            value={message}
            style={styles.text}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            disabled={loading}
            onClick={handleSaveFeedback}
          >
            {loading ? "Editing..." : "Edit Feedback"}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

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
    width: "80%",
    backgroundColor: "rgba(5, 4, 2, 0.8)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.8)",
    padding: "20px",
    border: "2px solid red",
    borderColor: "red",
    margin: "10px",
    textAlign: "center",
    position: "relative",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
    color: "red",
    textAlign: "center",
    width: "100%",
    padding: "10px",
    textTransform: "uppercase",
  },
  input: {
    width: "60%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "black",
    color: "white",
    fontSize: "1.2rem",
    marginBottom: "10px",
    textAlign: "left",
  },
  text: {
    width: "65%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "black",
    color: "white",
    fontSize: "1.2rem",
    marginBottom: "10px",
    textAlign: "left",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#ff0000",
    color: "black",
    FaBolt: "true",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.8s",
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
};

export default EditFeedback;