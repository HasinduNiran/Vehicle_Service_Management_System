import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateFeedback = () => {
  // State variables for form inputs and loading state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");
  const [starRating, setStarRating] = useState(1);
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]); // State for storing employees data
  const navigate = useNavigate(); // Hook for navigation

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
    if (!name || !email || !phoneNumber || !employee || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Format date_of_service
    const formattedDate = formatDate(dateOfService);

    const data = {
      name,
      email,
      phone_number: phoneNumber,
      employee,
      date_of_service: formattedDate,
      message,
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

  // Function to format date
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch employees data on component mount
  useEffect(() => {
    const fetchEmployeesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8076/employees");
        const employeesData = response.data;
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

  return (
    <div className="p-4">
      <a href="/feedback" className="text-blue-500 hover:underline mb-2 block">
        Back to Feedback
      </a>
      <h1 className="text-3xl my-4">Create Feedback</h1>

      {loading && <p>Loading...</p>}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Form inputs */}
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setPhoneNumber(e.target.value)}
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
              <option key={employee._id} value={employee.employeeName}>
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