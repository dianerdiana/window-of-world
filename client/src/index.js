import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { UserContextProvider } from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
