import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employee, setEmployee] = useState("");
  const [dateOfService, setDateOfService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/feedback/${id}`)
      .then((response) => {
        const {
          name,
          email,
          phone_number,
          employee,
          date_of_service,
          message,
        } = response.data;
        setName(name);
        setEmail(email);
        setPhoneNumber(phone_number);
        setEmployee(employee);
        setDateOfService(date_of_service);
        setMessage(message);
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

  const handleSaveFeedback = () => {
    if (name && email && phoneNumber && employee && dateOfService && message) {
      const data = {
        name,
        email,
        phone_number: phoneNumber,
        employee,
        date_of_service: dateOfService,
        message,
      };
      setLoading(true);
      axios
        .put(`http://localhost:8076/feedback/${id}`, data)
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
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">EditFeedback</h1>
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
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">Employee</label>
          <input
            type="text"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">Date Of Service</label>
          <input
            type="text"
            value={dateOfService}
            onChange={(e) => setDateOfService(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

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
