import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigateTo = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    ownTodos: [],
  });

  const handleChangeValues = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (registerData.name && registerData.email && registerData.password) {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      allUsers.push(registerData);
      localStorage.setItem("users", JSON.stringify(allUsers));
      setRegisterData({
        name: "",
        email: "",
        password: "",
        ownTodos: [],
      });
      navigateTo("/login");
      alert("Registration successfull!");
    } else {
      alert("Please fill all the fields!");
    }
  };

  return (
   <div id="screen">
     <div id="register">
      <div id="register-header">
        <h3>Register</h3>
      </div>
      <div id="register-main">
        <form onSubmit={handleRegisterSubmit}>
          <div className="fields">
            <label>Enter Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={registerData.name}
              onChange={handleChangeValues}
            />
          </div>
          <div className="fields">
            <label>Enter Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={registerData.email}
              onChange={handleChangeValues}
            />
          </div>
          <div className="fields">
            <label>Enter Your Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your password"
              value={registerData.password}
              onChange={handleChangeValues}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default Register;
