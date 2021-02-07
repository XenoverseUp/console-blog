import React from "react";
import { motion } from "framer-motion";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";

const Contact = () => {
  return (
    <motion.div
      variants={translateDownAndFadeOut}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      Contact
    </motion.div>
  );
};

export default Contact;
