import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Add useParams to the import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateFeedback = () => {
  // State variables for form inputs and loading state
  const [cussID, setCustomerID] = useState("");
  const [name, setCustomer_Name] = useState(""); // Changed variable name to match state setter
  const [email, setEmail] = useState("");
  const [phoneNumber, setContact_Number] = useState(""); // Changed variable name to match state setter
  const [employee, setEmployee] = useState("");
  const [starRating, setStarRating] = useState(1);
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]); // State for storing employees data
  const navigate = useNavigate(); // Hook for navigation
  const { cusID } = useParams(); // Access cusID from URL params using useParams

  // Function to handle saving feedback
  const handleSaveFeedback = async () => {
    // Check email and phone number format
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

    // Check if all fields are filled
    if (!cussID || !name || !email || !phoneNumber || !employee || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Format date_of_service
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
      // Send POST request
      await axios.post("http://localhost:8076/feedback", data);
      setLoading(false);
      navigate("/feedback"); // Navigate to feedback page after successful submission
    } catch (error) {
      setLoading(false);
      console.error("Error creating feedback:", error);
      alert(
        "An error occurred while creating feedback. Please try again later."
      );
    }
  };

  // Fetch customer details on component mount
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

  // Function to format date
  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Fetch employees data on component mount
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
  }, []); // Remove axios from dependencies array

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Feedback</h1>

      {loading && <p>Loading...</p>}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Form inputs */}
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Customer ID</label>
          <input
            type="text"
            value={cussID}
            onChange={(e) => setCustomerID(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setCustomer_Name(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setContact_Number(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Employee</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.employeeName}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Star Rating</label>
          <select
            value={starRating}
            onChange={(e) => setStarRating(parseInt(e.target.value))}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Date of Service</label>
          <DatePicker
            selected={dateOfService}
            onChange={(date) => setDateOfService(date)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        
        {/* Button to submit feedback */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveFeedback}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateFeedback;
