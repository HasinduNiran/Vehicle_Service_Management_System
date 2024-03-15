import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";

const ShowAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8076/feedback")
      .then((response) => {
        setFeedbacks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setError("An error occurred while fetching the feedback.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">All Feedbacks</h1>
        <Link
          to="/feedback/create"
          className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Feedback
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-green-800 rounded-md">Name</th>
              <th className="border border-green-800 rounded-md">Email</th>
              <th className="border border-green-800 rounded-md">
                Phone Number
              </th>
              <th className="border border-green-800 rounded-md">Employee</th>
              <th className="border border-green-800 rounded-md">
                Date of Service
              </th>
              <th className="border border-green-800 rounded-md">Message</th>
              <th className="border border-green-800 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No feedbacks available
                </td>
              </tr>
            ) : (
              feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td className="border border-gray-600 rounded-md">
                    {feedback.name}
                  </td>
                  <td className="border border-gray-600 rounded-md">
                    {feedback.email}
                  </td>
                  <td className="border border-gray-600 rounded-md">
                    {feedback.phone_number}
                  </td>
                  <td className="border border-gray-600 rounded-md">
                    {feedback.employee}
                  </td>
                  <td className="border border-gray-600 rounded-md">
                    {feedback.date_of_service}
                  </td>
                  <td className="border border-gray-600 rounded-md">
                    {feedback.message}
                  </td>
                  <td className="border border-gray-600 rounded-md">
                    <Link
                      to={`/feedback/edit/${feedback._id}`}
                      className="text-green-500 hover:text-green-700 mx-1"
                    >
                      <AiOutlineEdit />
                    </Link>
                    <Link
                      to={`/feedback/get/${feedback._id}`}
                      className="text-blue-500 hover:text-blue-700 mx-1"
                    >
                      <AiOutlineEye />
                    </Link>
                    <Link
                      to={`/feedback/delete/${feedback._id}`}
                      className="text-red-500 hover:text-red-700 mx-1"
                    >
                      <AiOutlineDelete />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllFeedback;
