import { createContext, useReducer } from "react";

export const AuthContexts = createContext();

const initalState = {
  currentUser: null,
  allTodos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null };
    case "TODOS":
      return { ...state, allTodos: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const login = (userData) => {
    localStorage.setItem("current-user", JSON.stringify(userData));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("current-user");
    dispatch({
      type: "LOGOUT",
    });
  };

  const todos = (todosData) => {
    localStorage.setItem("todos", JSON.stringify(todosData));
    dispatch({
      type: "TODOS",
      payload: todosData,
    });
  };

  return (
    <AuthContexts.Provider value={{ state, login, logout, todos }}>
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
