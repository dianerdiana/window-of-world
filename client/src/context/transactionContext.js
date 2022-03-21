import { createContext, useReducer } from "react";

export const TransactionContext = createContext();

const initialState = {
  isLogin: false,
  transaction: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // Creaet case "USER_SUCCESS" here ...
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      // Set item token to localStorage here ...
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        transaction: payload,
      };
    // Creaet case "AUTH_ERROR" here ...
    case "AUTH_ERROR":
    case "LOGOUT":
      // Remove item token from localStorage here ...
      localStorage.removeItem("token");
      return {
        isLogin: false,
        transaction: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
