import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import backgroundImage from "../../images/t.jpg";
import { FaStar } from "react-icons/fa";
const ReadOneFeedback = () => {
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8076/feedback/${id}`
        );
        setFeedback(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }
  const renderStars = () => {
    const starRating = parseInt(feedback.star_rating);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < starRating ? "star-filled" : "star-empty"}
            style={{
              ...styles.star,
              color: index < starRating ? "red" : "gray",
            }}
          />
        ))}
      </div>
    );
  };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Feedback Details</h1>

        <Link to={`/customer/get/${cusID}`} style={{ ...styles.button, color: "black" }}>
    
          Back to Feedback
        </Link>

        <p style={styles.label}>
          <span style={styles.value}>Customer ID:</span> {feedback.cusID}
        </p>
        <p style={styles.label}>
          <span style={styles.value}>Name:</span> {feedback.name}
        </p>
        <p style={styles.label}>
          <span style={styles.value}>Email:</span> {feedback.email}
        </p>
        <p style={styles.label}>
          <span style={styles.value}>Message:</span> {feedback.message}
        </p>
        <p style={styles.label}>
          <span style={styles.value}>Phone Number:</span>{" "}
          {feedback.phone_number}
        </p>
        <p style={styles.label}>
          <span style={styles.value}>Employee:</span> {feedback.employee}
        </p>
        <p style={styles.label}>
          <span style={styles.value}>Star Rating:</span> {renderStars()}
        </p>
        <p style={styles.label}>
          <span style={styles.value}>Date of Service:</span>{" "}
          {feedback.date_of_service}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    width: "100%",
    hight: "100%",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#fff",
    width: "100%",
    hight: "100%",
  },
  label: {
    fontWeight: "bold",
    color: "red",
    width: "100%",
    hight: "100%",
    padding: "20px",
    textTransform: "uppercase",
  },
  value: {
    color: "white",
    width: "100%",
    hight: "100%",
  },
  formContainer: {
    width: "100%",
    hight: "100%",
    backgroundColor: "rgba(5, 4, 2, 0.8)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.8)",
    padding: "20px",
    border: "2px solid red",
    borderColor: "red",
    margin: "10px",
    textAlign: "center",
    position: "relative",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ff0000",
    color: "black", // Change the text/icon color here
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.8s",
    width: "100%",
    hight: "100%",
  },
};

export default ReadOneFeedback;