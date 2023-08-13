import { createContext, useEffect, useReducer } from "react";

export const AuthContexts = createContext();

const initialState = {
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
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("current-user"));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });

    const todosData = JSON.parse(localStorage.getItem("todos"));
    dispatch({
      type: "TODOS",
      payload: todosData,
    });
  }, []);

  return (
    <AuthContexts.Provider value={{ state, login, logout, todos }}>
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
