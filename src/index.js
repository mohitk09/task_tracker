import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

Amplify.configure(awsExports);
