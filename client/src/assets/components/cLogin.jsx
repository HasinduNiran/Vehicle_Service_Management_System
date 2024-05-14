import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/t.jpg';
import video1 from '../images/2.mp4';
import Header from "./Header";
import "./c.css"

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
    if (cusID === 'customer' && password === 'customer123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Kasuni",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/customer/customerDashboard');
      return; 
    }
    else if (cusID === 'package' && password === 'package123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Ravindu",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/package/dashboard');
      return; 
    }
    else if (cusID === 'booking' && password === 'booking123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Isuru",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/booking/dashboard');
      return; 
    }
    else if (cusID === 'vehicle' && password === 'vehicle123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Hasindu",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/vehicle/dashboard');
      return; 
    }
    else if (cusID === 'inventory' && password === 'inventory123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Lasal",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/inventory/InventoryDashboard');
      return; 
    }
    else if (cusID === 'payment' && password === 'payment123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Sithagi",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/payments/pdashboard');
      return; 
    }
    else if (cusID === 'employee' && password === 'employee123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Kavindi",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/employees/EmployeeDashboard');
      return; 
    }
    else if (cusID === 'feedback' && password === 'feedback123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back! Yenura",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/feedback/dashboard');
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
    <div className="HN">
    <div className="login-root" style={{ marginTop: "150px" }}>
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
        </div>
        <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
          
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15" style={{ fontWeight: "bold", textAlign: "center" }}>Log in to your account</span>

                <form id="stripe-login" onSubmit={onLogin}>
                  <div className="field padding-bottom--24">
                    <label htmlFor="username">Username</label>
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
              
            <span>Don't have an account? <a href="/customer/create" class="signup-link" style={{color:"black"}}>Sign up</a></span>

              <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                <span><a href="#">© Stackfindover</a></span>
                <span><a href="#">Contact</a></span>
                <span><a href="#">Privacy & terms</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default CLogin;

