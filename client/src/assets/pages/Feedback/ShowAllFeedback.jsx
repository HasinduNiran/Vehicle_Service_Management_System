import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import jsPDF from "jspdf";
import debounce from "lodash.debounce"; // Import debounce from lodash

const ShowAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalFeedbacks, setOriginalFeedbacks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    const filteredFeedbacks = originalFeedbacks.filter((feedback) =>
      applySearchFilter(feedback, searchQuery)
    );
    setFeedbacks(filteredFeedbacks);
    setLoading(false);
  };

  // Add debounce to handleSearch function
  const debouncedSearch = debounce(handleSearch, 300); // Debounce for 300ms
  useEffect(() => {
    debouncedSearch(); // Call the debounced function
    return debouncedSearch.cancel; // Cleanup debounce on component unmount
  }, [searchQuery]); // Re-run effect if searchQuery changes

  useEffect(() => {
    setLoading(true);
    // Fetch feedbacks
    axios
      .get("http://localhost:8076/feedback")
      .then((response) => {
        setFeedbacks(response.data.data);
        setOriginalFeedbacks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setError("An error occurred while fetching the feedback.");
        setLoading(false);
      });

    // Fetch employees
    axios
      .get("http://localhost:8076/employees")
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("An error occurred while fetching employees.");
      });
  }, []);

  const applySearchFilter = (feedback, query) => {
    return (
      feedback.name.toLowerCase().includes(query.toLowerCase()) ||
      feedback.email.toLowerCase().includes(query.toLowerCase()) ||
      feedback.phone_number.toLowerCase().includes(query.toLowerCase()) ||
      feedback.employee.toLowerCase().includes(query.toLowerCase()) ||
      feedback.date_of_service.toLowerCase().includes(query.toLowerCase()) ||
      feedback.message.toLowerCase().includes(query.toLowerCase())
    );
  };

  const generatePDF = (feedbacks) => {
    if (feedbacks.length === 0) {
      console.log("No feedbacks to generate PDF.");
      return;
    }
    const doc = new jsPDF();
    let y = 10;
    feedbacks.forEach((feedback, index) => {
      const feedbackText = `Name: ${feedback.name}\nEmail: ${
        feedback.email
      }\nPhone Number: ${feedback.phone_number}\nEmployee: ${
        feedback.employee
      }\nDate of Service: ${feedback.date_of_service}\nMessage: ${
        feedback.message
      }\nStar Rating: ${
        feedback.star_rating !== null ? feedback.star_rating : "N/A"
      }\n\n`;
      doc.text(feedbackText, 10, y);
      y += 50;
    });
    doc.save("feedback_report.pdf");
  };

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

        <div className="create-button">
          <Link
            to="/feedback/create"
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Feedback
          </Link>
          <button
            onClick={() => generatePDF(feedbacks)}
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Generate Report
          </button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="table">
          <table className="table-auto w-full mb-4">
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
                <th className="border border-green-800 rounded-md">
                  Star Rating
                </th>
                <th className="border border-green-800 rounded-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
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
                      {employees.find((emp) => emp.name === feedback.employee)
                        ?.employeeName || "Unknown"}
                    </td>
                    <td className="border border-gray-600 rounded-md">
                      {feedback.date_of_service}
                    </td>
                    <td className="border border-gray-600 rounded-md">
                      {feedback.message}
                    </td>
                    <td className="border border-gray-600 rounded-md">
                      {feedback.star_rating !== null
                        ? feedback.star_rating
                        : "N/A"}
                    </td>
                    <td className="border border-gray-600 rounded-md">
                      <div className="flex justify-around">
                        <Link
                          to={`/feedback/edit/${feedback._id}`}
                          className="text-2xl text-green-800"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          to={`/feedback/get/${feedback._id}`}
                          className="text-2xl text-yellow-600"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to={`/feedback/delete/${feedback._id}`}
                          className="text-2xl text-red-600"
                        >
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowAllFeedback;
