import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");
  const [dateOfService, setDateOfService] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [starRating, setStarRating] = useState(null);
  const [feedbackId, setFeedbackId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbackData();
    fetchEmployeesData();
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
    setEmailError("");
    setPhoneNumberError("");

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
        navigate("/feedback");
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

  return (
    <div className="p-4">
      <a href="/feedback" className="text-blue-500 hover:underline mb-2 block">
        Back to Feedback
      </a>
      <h1 className="text-3xl my-4">Edit Feedback</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="p-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              emailError && "border-red-500"
            }`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <label className="text-xl mr-4 text-gray-500">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              phoneNumberError && "border-red-500"
            }`}
          />
          {phoneNumberError && (
            <p className="text-red-500 text-sm">{phoneNumberError}</p>
          )}

          <div className="p-4">
            <label className="text-xl mr-4 text-gray-500">Employee</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.employeeName}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
          </div>

          <label className="text-xl mr-4 text-gray-500">Date Of Service</label>
          <DatePicker
            selected={dateOfService}
            onChange={(date) => setDateOfService(date)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">Star Rating</label>
          <select
            value={starRating || ""}
            onChange={(e) => setStarRating(parseInt(e.target.value))}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Star Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <div className="flex justify-center"></div>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveFeedback}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFeedback;