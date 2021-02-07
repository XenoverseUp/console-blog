import React, { createContext, useState, useEffect } from "react";
import AuthServices from "../services/AuthServices";
import { Preloader } from "../components";
import { AnimatePresence } from "framer-motion";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const { user, isAuthenticated } = await AuthServices.isAuthenticated();

      setUser(user);
      setIsAuthenticated(isAuthenticated);
      setIsLoaded(true);
    };
    fetchAPI();
  }, []);

  return (
    <React.Fragment>
      <AnimatePresence exitBeforeEnter>
        {!isLoaded ? (
          <Preloader />
        ) : (
          <AuthContext.Provider
            value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
          >
            {children}
          </AuthContext.Provider>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};
