import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8076/feedback?search=${searchQuery}`
      );
      setFeedbacks(response.data.data);
      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError(
        "An error occurred while fetching the feedback for the search query."
      );
      setLoading(false);
    }
  };

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

  // Filter function to apply search query filter
  const applySearchFilter = (feedback) => {
    return (
      feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.date_of_service
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filter feedbacks based on search query
  const filteredFeedbacks = feedbacks.filter(applySearchFilter);

  return (
    <div className="p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">All Feedbacks</h1>
        <div className="mb-4">
          <input
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
            className="mr-2 border border-gray-400 p-2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
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
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No feedbacks available
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((feedback) => (
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
                      className="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/feedback/get/${feedback._id}`}
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    >
                      View
                    </Link>
                    <Link
                      to={`/feedback/delete/${feedback._id}`}
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
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
