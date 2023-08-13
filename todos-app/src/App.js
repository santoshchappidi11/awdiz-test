import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AllTodos from "./components/Todos/AllTodos";
import CreateTodo from "./components/Todos/CreateTodo";
import OwnTodos from "./components/Todos/OwnTodos";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/all-todos" element={<AllTodos />} />
        <Route exact path="/create-todo" element={<CreateTodo />} />
        <Route exact path="/own-todos" element={<OwnTodos />} />
      </Routes>
    </div>
  );
}

export default App;
