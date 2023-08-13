import React, { useContext, useEffect, useState } from "react";
import "./CreateTodos.css";
import { AuthContexts } from "../Context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const CreateTodo = () => {
  const { state, todos } = useContext(AuthContexts);
  const [currentUser, setCurrentUser] = useState({});
  const [createTodoData, setCreateTodoData] = useState({
    subject: "",
    description: "",
  });

  useEffect(() => {
    if (state?.currentUser?.email) {
      setCurrentUser(state?.currentUser);
    } else {
      setCurrentUser({});
    }
  }, [state]);

  const handleChangeValues = (e) => {
    setCreateTodoData({ ...createTodoData, [e.target.name]: e.target.value });
  };

  const handleCreateTodoSubmit = (e) => {
    e.preventDefault();

    if (createTodoData.subject && createTodoData.description) {
      let flag = false;
      if (currentUser?.email) {
        flag = true;
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        for (let i = 0; i < allUsers.length; i++) {
          if (
            allUsers[i].email == currentUser.email &&
            allUsers[i].password == currentUser.password
          ) {
            let randomId = uuidv4();
            createTodoData["id"] = randomId;
            allUsers[i].ownTodos.push(createTodoData);
            const todosLS = JSON.parse(localStorage.getItem("todos")) || [];
            todosLS.push(createTodoData);
            todos(todosLS);
          }
        }
        localStorage.setItem("users", JSON.stringify(allUsers));
        setCreateTodoData({
          subject: "",
          description: "",
        });
        alert("New Todo created Successfully!");
      }

      if (flag == false) {
        alert("Please login to create todo");
      }
    } else {
      alert("Please fill all the details!");
    }
  };

  return (
    <div id="screen">
      <div id="create-todo">
        <div id="create-todo-header">
          <h3>create-todo</h3>
        </div>
        <div id="create-todo-main">
          <form onSubmit={handleCreateTodoSubmit}>
            <div className="fields">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter Subject"
                value={createTodoData.subject}
                onChange={handleChangeValues}
              />
            </div>
            <div className="fields">
              <label>Subject description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter subject description"
                value={createTodoData.description}
                onChange={handleChangeValues}
              />
            </div>

            <button type="submit">Create Todo</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
