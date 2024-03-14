import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [Musername, setMusername] = useState("");
  const [Mpassword, setMpassword] = useState("");

  let navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      Musername,
      Mpassword,
    };

    await axios
      .post("http://localhost:8076/Manager/login", credentials)
      .then((response) => {
        if (response.data.Musername === "customer") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back! Kasuni",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/customer/allCustomer");
        } else if (response.data.Musername === "package") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back! Ravindu",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/package");
        } else if (response.data.Musername === "booking") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back! Isuru",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/show-all");
        } else if (response.data.Musername === "vehicle") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back! Hasindu",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/vehicle");
        } else if (response.data.Musername === "inventory") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back! Lasal",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/inventory/allInventory");
        } else if (response.data.Musername === "payment") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back! Sithagi",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/payments/show");
        } else if (response.data.Musername === "employee") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome back! Kavindi",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/employees/allEmployee");
        }else if (response.data.Musername === "feedback") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Welcome back! Yenura",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate("/feedback");
          }
      })
      .catch((error) => {
        Swal.fire("Error!", "Incorrect username or Password!", "error");
      });
  };

  return (
    <form className="login-form max-w-xs mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">LOGIN</h2>
      <div className="mb-4">
        <label htmlFor="Musername" className="block text-gray-700 mb-2">Username:</label>
        <input
          type="text"
          id="userName"
          value={Musername}
          onChange={(e) => setMusername(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="Mpassword" className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={Mpassword}
          onChange={(e) => setMpassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <button type="submit" onClick={onLogin} className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
        Login
      </button>
    </form>
  );
}

export default Login;
