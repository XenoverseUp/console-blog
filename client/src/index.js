import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import AuthProvider from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";
import CategoryProvider from "./contexts/CategoryContext";

import "./scss/index.scss";
import "./scss/drawer.scss";


render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CategoryProvider>
          <Router>
            <App />
          </Router>
        </CategoryProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

