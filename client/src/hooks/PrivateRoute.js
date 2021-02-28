import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { motion } from "framer-motion";
const PrivateRoute = ({ component: Component, roles, random, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated)
          return (
            <motion.div exit="undefined">
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            </motion.div>
          );

        if (!roles.includes(user.role))
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );

        return <Component {...(random && { random })} {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
