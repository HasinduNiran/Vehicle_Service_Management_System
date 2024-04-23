import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import backgroundImage from '../images/t.jpg'; // Import the background image
import image1 from '../images/1.jpg'; // Import additional images
import image2 from '../images/ab2.jpg';
// Import other images...

function Login() {
  const [Musername, setMusername] = useState("");
  const [Mpassword, setMpassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      Musername,
      Mpassword,
    };

    try {
      const response = await axios.post("http://localhost:8076/Manager/login", credentials);
      const userData = response.data;

      if (userData) {
        let message = "";
        switch (userData.Musername) {
          case "customer":
            message = "Welcome back! Kasuni";
            navigate("/customer/customerDashboard");
            break;
          case "package":
            message = "Welcome back! Ravindu";
            navigate("/package/dashboard");
            break;
          case "booking":
            message = "Welcome back! Isuru";
            navigate("/booking/dashboard");
            break;
          case "vehicle":
            message = "Welcome back! Hasindu";
            navigate("/vehicle/dashboard");
            break;
          case "inventory":
            message = "Welcome back! Lasal";
            navigate("/inventory/InventoryDashboard");
            break;
          case "payment":
            message = "Welcome back! Sithagi";
            navigate("/payments/pdashboard");
            break;
          case "employee":
            message = "Welcome back! Kavindi";
            navigate("/employees/EmployeeDashboard");
            break;
          case "feedback":
            message = "Welcome back! Yenura";
            navigate("/feedback/dashboard");
            break;
          default:
            break;
        }
        
        Swal.fire({
          position: "center",
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire("Error!", "Incorrect username or Password!", "error");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message || error.message);
      Swal.fire("Error!", "Incorrect username or Password!", "error");
    }
  };

  return (
    <div style={styles.container}>
      <div className="images">
        {/* <img src={image1} alt="Image 1" className="image1" />
        <img src={image2} alt="Image 2" className="image2" /> */}
        {/* Add more images and adjust classNames */}
      </div>
      <form onSubmit={onLogin} style={styles.form}>
        <h2 style={styles.header}>LOGIN</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="Musername" style={styles.label}>Username:</label>
          <input
            type="text"
            id="Musername"
            value={Musername}
            onChange={(e) => setMusername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="Mpassword" style={styles.label}>Password:</label>
          <input
            type="password"
            id="Mpassword"
            value={Mpassword}
            onChange={(e) => setMpassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: '#f2f2f2',
    backgroundImage: `url(${backgroundImage})`, // Apply background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    width: '400px',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    border: '2px solid red',
    margin: '10px',
    textAlign: 'center',
    position: 'relative',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.2rem',
    marginBottom: '10px',
    textAlign: 'left',
  },
  header: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    background: 'red',
  },
  // Add styles for the images if necessary
  image1: {
    width: '1px',
    height: '1px',
    borderRadius: '50%',
    // Add more image styles as needed
  },
  image2: {
    width: '1px',
    height: '1px',
    borderRadius: '50%',
    // Add more image styles as needed
  },
  // Add more image styles as needed
};

export default Login;
