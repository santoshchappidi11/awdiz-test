import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { state, logout } = useContext(AuthContexts);
  const [currentUser, setCurrentUser] = useState({});
  const navigateTo = useNavigate();
  console.log(currentUser.name);
  
  useEffect(() => {
    if (state?.currentUser?.email) {
      //   console.log(state.currentUser?.email);
      setCurrentUser(state?.currentUser);
    } else {
      setCurrentUser({});
    }
  }, [state]);

  return (
    <div id="navbar">
      <div id="logo">
        <h2>LOGO</h2>
      </div>
      <div id="nav-items">
        <h3 onClick={() => navigateTo("/all-todos")}>All Todos</h3>
        {currentUser?.name && (
          <h3 onClick={() => navigateTo("/create-todo")}>Create Todo</h3>
        )}
        {currentUser?.name && (
          <h3 onClick={() => navigateTo("/own-todos")}>Own Todos</h3>
        )}
        {currentUser?.name && <h3>Hi {currentUser?.name}</h3>}
        {!currentUser?.name && (
          <h3 onClick={() => navigateTo("/register")}>Register/Login</h3>
        )}
        {currentUser?.name && <h3 onClick={logout}>Logout</h3>}
      </div>
    </div>
  );
};

export default Navbar;
