import React, { useContext, useEffect, useState } from "react";
import "./OwnTodos.css";
import { AuthContexts } from "../Context/AuthContext";

const OwnTodos = () => {
  const { state } = useContext(AuthContexts);
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  console.log(currentUser);

  useEffect(() => {
    if (state?.currentUser?.email) {
      setCurrentUser(state?.currentUser);
    } else {
      setCurrentUser({});
    }
  }, [state]);

  useEffect(() => {
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];

      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == currentUser.email &&
          allUsers[i].password == currentUser.password
        ) {
          // console.log(allUsers[i].OwnTodos);
          setTodos(allUsers[i].OwnTodos);
        }
      }
    }
  }, [currentUser]);

  return (
    <div id="all-todos-screen">
      <div id="all-todos">
        {todos?.map((todo) => (
          <div className="todo" key={todo.id}>
            <h3>{todo.subject}</h3>
            <p>{todo.description}</p>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnTodos;
