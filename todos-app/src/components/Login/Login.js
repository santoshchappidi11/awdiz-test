import React, { useContext, useState } from "react";
import "./Login.css";
import { AuthContexts } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContexts);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigateTo = useNavigate();

  const handleChangeValues = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (loginData.email && loginData.password) {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      let flag = false;
      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == loginData.email &&
          allUsers[i].password == loginData.password
        ) {
          flag = true;
          // const newLoginData = {
          //   name: allUsers[i].name,
          //   email: allUsers[i].email,
          //   password: allUsers[i].password,
          // };
          login(allUsers[i]);
          setLoginData({ email: "", password: "" });
          alert("Login successfull!");
        }
      }

      if (flag == false) {
        alert("Invalid Email or Password!");
      }
    } else {
      alert("Please fill all the details!");
    }
  };

  return (
    <div id="screen">
      <div id="login">
        <div id="login-header">
          <h3>login</h3>
        </div>
        <div id="login-main">
          <form onSubmit={handleLoginSubmit}>
            <div className="fields">
              <label>Enter Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={loginData.email}
                onChange={handleChangeValues}
              />
            </div>
            <div className="fields">
              <label>Enter Your Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your password"
                value={loginData.password}
                onChange={handleChangeValues}
              />
            </div>
            <button type="submit">Login</button>
            <div>
              <p>
                Don't have an account?{" "}
                <b onClick={() => navigateTo("/register")}>Register</b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
