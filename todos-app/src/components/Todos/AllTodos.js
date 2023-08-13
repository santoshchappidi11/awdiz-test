import React, { useContext, useEffect, useState } from "react";
import "./AllTodos.css";
import { AuthContexts } from "../Context/AuthContext";

const AllTodos = () => {
  const { state } = useContext(AuthContexts);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (state?.allTodos?.length) {
      setTodos(state?.allTodos);
    } else {
      setTodos([]);
    }
  }, [state]);

  return (
    <div id="all-todos-screen">
      <div id="all-todos">
        {todos?.map((todo) => (
          <div className="todo" key={todo.id}>
            <h3>{todo.subject}</h3>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTodos;
