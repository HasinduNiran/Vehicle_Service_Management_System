import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateFeedback = ({ cusID }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [starRating, setStarRating] = useState(1);
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !employee ||
      !message
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    if (!dateOfService) {
      alert("Please select a date of service.");
      return;
    }

    const formattedDate = formatDate(dateOfService);

    const data = {
      cusID: cusID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phoneNumber,
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/customer/${cusID}`)
      .then((response) => {
        const data = response.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phone);
        setEmail(data.email);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`An error happened. Please check console`);
        console.log(error);
      });
  }, [cusID]);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Feedback</h1>

      {loading && <p>Loading...</p>}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">First Name</label>
          <input
            type="text"
            value={firstName || ""}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Last Name</label>
          <input
            type="text"
            value={lastName || ""}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber || ""}
            readOnly
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
          s // Extra 's' here
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

        <button
          type="button"
          className="p-2 bg-sky-300 m-8"
          onClick={handleSaveFeedback}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateFeedback;
