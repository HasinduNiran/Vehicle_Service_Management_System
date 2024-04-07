import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CLogin() {
  const [Username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      Username,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8076/customer/cLogin", credentials);
      const userData = response.data;

      if (userData) {
        // Redirect to user dashboard
        navigate("/cusDashboard");

        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome back, ${userData.username}!`,
          showConfirmButton: false,
          timer: 2000,
        });
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
      console.error("Login failed:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={Username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CLogin;