import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");
  const [starRating, setStarRating] = useState(1);
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleSaveFeedback = () => {
    if (!name || !email || !phoneNumber || !employee || !dateOfService || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const data = {
      name,
      email,
      phone_number: phoneNumber,
      employee,
      date_of_service: dateOfService,
      message,
    };

    console.log(data); // Replace with actual server call
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

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
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeesData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Feedback</h1>

      {loading && <p>Loading...</p>}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        
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
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeName}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4">
  <label className="text-xl mr-4 text-gray-500">Star Rating</label>
  <input
    type="number"
    value={starRating}
    onChange={(e) => setStarRating(parseInt(e.target.value))}
    className="border-2 border-gray-500 px-4 py-2 w-full"
  />
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
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

      
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveFeedback}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateFeedback;
