// CLogin.js

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../images/t.jpg';
import video1 from '../images/2.mp4';

import Header from "./Header";

import "./signup.css";

import Header from '../components/Header';


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

    <div className="login-root" style={{ marginTop: "30px" }}>
      <Header />
    <div className="login-root">
      <div className="box-root flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: 1 }}>
        <div className="loginbackground box-background--white padding-top--64">
          <div className="loginbackground-gridContainer">
            <div className="box-root flex-flex" style={{ gridArea: "top / start / 8 / end" }}>
              <div className="box-root" style={{ backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)", flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
              <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "6 / start / auto / 2" }}>
              <div className="box-root box-background--blue800" style={{ flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "7 / start / auto / 4" }}>
              <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
              <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "2 / 15 / auto / end" }}>
              <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "3 / 14 / auto / end" }}>
              <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "4 / 17 / auto / 20" }}>
              <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
            </div>
            <div className="box-root flex-flex" style={{ gridArea: "5 / 14 / auto / 17" }}>
              <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }} />
            </div>
          </div>

    <div>
    <Header/>
    <div style={styles.container}>
      <form onSubmit={onLogin} style={styles.form}>
        <div className="image-container" style={styles.imageContainer}>
          <video autoPlay loop muted style={styles.video}>
            <source src={video1} type="video/mp4" />
          </video>

        </div>
        <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
           <div className="ss"> <h>Nadika Autocare</h></div>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15" style={{ fontWeight: "bold", textAlign: "center",fontSize: "1.5rem" }}>Log in to your account</span>

                <form id="stripe-login" onSubmit={onLogin}>
                  <div className="field padding-bottom--24">
                    <label htmlFor="username">User Name</label>
                    <input type="text" name="username" id="username" onChange={(e) => setCusID(e.target.value)} />
                  </div>
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Password</label>
                      <div className="reset-pass">
                        <a href="#">Forgot your password?</a>
                      </div>
                    </div>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {/* <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                    <label htmlFor="checkbox">
                      <input type="checkbox" name="checkbox" /> Stay signed in for a week
                    </label>
                  </div> */}
                  <div className="field padding-bottom--24">
                    <input type="submit" name="submit" value="Log In" />
                  </div>
                  
                </form>
              </div>
            </div>
            <div className="footer-link padding-top--24">
              <span>Don't have an account? <a href='/customer/create'>Sign up</a></span>
              <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                <span><a href="#">Contact</a></span>
                <span><a href="#">Privacy & terms</a></span>
              </div>
            </div>
          </div>


          <button type="submit" style={styles.button}>Login</button>
          <Link to="/customer/create" style={styles.registerLink}>Don't you have an account? Sign Up Here.</Link>

        </div>
      </div>
    </div>
    </div>
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
    height: '400px',
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
  registerLink: {
    color: 'white',
    textDecoration: 'none',
    marginTop: '10px',
    display: 'block',
    fontSize: '16px',
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
