import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Preloader.scss";
import { motion } from "framer-motion";
import fadeOut from "../../animations/fadeOut";

const Preloader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <motion.div
      className={`preloader ${theme}`}
      variants={fadeOut}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <svg viewBox="-2000 -1000 4000 2000">
        <path
          id="use"
          d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z"
        ></path>
        <use
          xlinkHref="#use"
          strokeDasharray="2280 4543"
          strokeDashoffset="6713px"
        ></use>
      </svg>

      <h1>CONSOLE</h1>
      <p>Yükleniyor...</p>
    </motion.div>
  );
};

export default Preloader;
