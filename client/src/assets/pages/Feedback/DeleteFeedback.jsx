import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import backgroundImage from "../../images/t.jpg";

const DeleteFeedback = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [cusID, setCusID] = useState("");




  const confirmDeleteFeedback = () => {
    return window.confirm("Are you sure you want to delete this feedback?");
  };

  const handleDelete = () => {
    if (!confirmDeleteFeedback()) {
      return;
    }

    setLoading(true);
    axios
      .delete(`http://localhost:8076/feedback/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error deleting feedback:", error);

        let errorMessage =
          "An error occurred while deleting the feedback. Please try again later.";
        if (error.response?.status === 404) {
          errorMessage = "Feedback not found. It may have already been deleted.";
        }

        alert(errorMessage);
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-1/2 bg-gray-800 bg-opacity-80 rounded p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Delete Feedback</h1>
        <p className="text-white mb-4">Are you sure you want to delete this Feedback?</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <Link
            to={"/feedback"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeedback;