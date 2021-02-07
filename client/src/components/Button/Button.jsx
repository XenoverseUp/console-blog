import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import "./Button.scss";
import tapping from "../../animations/tapping";

const Button = ({ children, leftIcon, rightIcon, to, ...rest }) => {
  const { theme } = useContext(ThemeContext);
  let location = useLocation();
  const history = useHistory();

  return to ? (
    <motion.button
      className={`button ${theme}`}
      whileTap={tapping}
      onClick={() =>
        history.push({ pathname: to, state: { from: location.pathname } })
      }
      {...rest}
    >
      <span className="left-icon">{leftIcon}</span>
      {children}
      <span className="right-icon">{rightIcon}</span>
    </motion.button>
  ) : (
    <motion.button whileTap={tapping} className={`button ${theme}`} {...rest}>
      <span className="left-icon">{leftIcon}</span>
      {children}
      <span className="right-icon">{rightIcon}</span>
    </motion.button>
  );
};

export default Button;
