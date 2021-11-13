import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
