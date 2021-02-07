import React from "react";
import { motion } from "framer-motion";

const SplitText = ({ children, ...rest }) => {
  const words = children.split(" ");
  return words.map((word, i) => (
    <div
      key={children + i}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      <motion.div
        {...rest}
        custom={i}
        style={{ display: "inline-block", willChange: "transform" }}
      >
        {word + (i !== words.length - 1 ? "\u00A0" : "")}
      </motion.div>
    </div>
  ));
};

export default SplitText;
