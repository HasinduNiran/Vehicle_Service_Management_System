import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const DeleteFeedback = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    // Display confirmation dialog before deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (!confirmDelete) {
      return;
    }

    setLoading(true);
    axios
      .delete(`http://localhost:8076/feedback/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/feedback");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error deleting feedback:", error);
        alert(
          "An error occurred while deleting the feedback. Please try again later."
        );
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Delete Feedback</h1>
      <p>Are you sure you want to delete this Feedback?</p>
      <div className="flex justify-between items-center">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
  );
};

export default DeleteFeedback;
