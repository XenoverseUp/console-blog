import React from "react";
import { motion } from "framer-motion";
import {
  visibleOverlay,
  hiddenOverlay,
} from "../../animations/overlayVariants";

const styles = {
  position: "fixed",
  top: -50,
  bottom: -50,
  left: -50,
  right: -50,
  backgroundColor: "rgb(0, 0, 0)",
};

const Overlay = ({ open = true, zIndex = 100, onClick, hidden = false }) =>
  open && (
    <motion.div
      style={{ ...styles, zIndex }}
      variants={hidden ? hiddenOverlay : visibleOverlay}
      initial="initial"
      animate="visible"
      exit="exit"
      onClick={onClick}
    />
  );

export default Overlay;
