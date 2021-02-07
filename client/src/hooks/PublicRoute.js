import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (restricted) {
          if (isAuthenticated)
            return (
              <motion.div exit="undefined">
                <Redirect
                  to={{ pathname: "/", state: { from: props.location } }}
                />
              </motion.div>
            );

          return <Component {...props} />;
        } else return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
