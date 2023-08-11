import React, { useContext, useState } from "react";
import "./Login.css";
import { AuthContexts } from "../Context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContexts);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

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
          // localStorage.setItem("current-user", JSON.stringify(loginData));
          login(loginData);
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
