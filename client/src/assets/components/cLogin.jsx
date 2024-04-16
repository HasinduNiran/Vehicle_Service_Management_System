import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/t.jpg';
<<<<<<< Updated upstream
import video1 from '../images/2.mp4';import img1 from '../images/login.jpg';
import img1 from '../images/login.jpg';
=======
import video1 from '../images/2.mp4';

>>>>>>> Stashed changes
function CLogin() {
  const [cusID, setCusID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      cusID,
      password,
    };

    // Check if the credentials are 'staff'
    if (cusID === 'staff' && password === 'staff') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Welcome back Nadeeka Auto care Staff`,
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/Mlogin');
      return; 
    }

    try {
      const response = await axios.post("http://localhost:8076/customer/cLogin", credentials);
      const userData = response.data;

      if (userData) {
        // Redirect to user dashboard if necessary (handle on server side)
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome back, ${userData.firstName}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        // Perform navigation after successful login
        navigate(`/ReadOneHome/${cusID}`);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid credentials",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message || error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed",
        text: error.response.data.message || error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onLogin} style={styles.form}>
        <div className="image-container" style={styles.imageContainer}>
          <video autoPlay loop muted style={styles.video}>
            <source src={video1} type="video/mp4" />
          </video>
        </div>
        <div style={styles.formContent}>
          <h1 style={styles.header}>Login</h1>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={cusID}
              onChange={(e) => setCusID(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f2f2f2',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    width: '800px', // Adjust form width as needed
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    border: '2px solid red',
    borderColor: 'red',
    margin: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
<<<<<<< Updated upstream
  },
  formContent: {
    flex: 1,
    paddingLeft: '20px',
=======
>>>>>>> Stashed changes
  },
  formContent: {
    flex: 1,
    paddingLeft: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'white',
    textAlign: 'center',
    width: '100%',
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
    fontSize: '2rem',
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
  imageContainer: {
    marginRight: '20px',
  },
  video: {
    width: '100%', // Adjust video size as needed
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.9)',
  },
};

export default CLogin;
