import { createContext, useState, useEffect, Fragment } from "react";
import AuthServices from "../services/AuthServices";
import { Preloader } from "../components";
import { AnimatePresence } from "framer-motion";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
    <Fragment>
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
    </Fragment>
  );
};

export default AuthProvider;
