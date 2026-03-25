import React from "react";
import ReactDOM from "react-dom/client";

import "./i18n";
import "./styles/styles.css";

import { Provider } from "./components/ui/provider";

import { AuthProvider } from "./AuthProvider";
import Login from "./components/Login";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
