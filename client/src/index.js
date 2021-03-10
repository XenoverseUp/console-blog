import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import AuthProvider from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";
import CategoryProvider from "./contexts/CategoryContext";
import QueryProvider from "./contexts/QueryContext";
import ScrollProvider from "./contexts/ScrollContext";

import "./scss/index.scss";
import "./scss/drawer.scss";

render(
  // <React.StrictMode>
  <ThemeProvider>
    <QueryProvider>
      <AuthProvider>
        <CategoryProvider>
          <ScrollProvider>
            <Router>
              <App />
            </Router>
          </ScrollProvider>
        </CategoryProvider>
      </AuthProvider>
    </QueryProvider>
  </ThemeProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);
