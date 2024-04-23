import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../../images/t.jpg";
import { FaStar } from "react-icons/fa";

const CreateFeedback = () => {
  const [cussID, setCustomerID] = useState("");
  const [name, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");
  const [starRating, setStarRating] = useState("");
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { cusID } = useParams();

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

  const handleSaveFeedback = async () => {
    // Validation code here
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // Check if all required fields are filled
    if (!name || !email || !phoneNumber || !employee || !message || !dateOfService) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number format
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
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
      await axios.post("http://localhost:8076/feedback", data);
      setLoading(false);
      navigate(`/customer/get/${cusID}`);
    } catch (error) {
      setLoading(false);
      console.error("Error creating feedback:", error);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleStarClick = (index) => {
    setStarRating(index + 1);
  };

  const handleStarHover = (index) => {
    setStarRating(index + 1); // Update star rating based on hover index
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
            style={{ ...styles.star, color: index < starRating ? "red" : "gray" ,
            height: "50px",width:"50px",
          }}
          />
        ))}
      </div>
    );
  };

  

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Create Feedback</h1>
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
              <option key={employee._id} value={employee.employeeName}>
                {employee.employeeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label}>Star Rating</label>
          <div>{renderStars()}</div>
        </div>
        <div>
          <label style={styles.label}>Date of Service</label>
          <DatePicker
            selected={dateOfService}
            onChange={(date) => setDateOfService(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input text-black"
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
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
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
};

export default CreateFeedback;