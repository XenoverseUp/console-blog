import { createContext, useState, useEffect, Fragment } from "react";
import AuthServices from "../services/AuthServices";
import { Preloader } from "../components";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data, isLoading } = useQuery("auth", AuthServices.isAuthenticated);

  useEffect(() => {
    setUser(data?.user);
    setIsAuthenticated(data?.isAuthenticated);
  }, [data]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isLoading ? (
        <Preloader />
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </AnimatePresence>
  );
};

export default AuthProvider;
