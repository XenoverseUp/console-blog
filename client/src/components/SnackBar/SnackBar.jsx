import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CheckCircle, Error, Warning, CloseRounded } from "@material-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import "./SnackBar.scss";

const transition = {
  type: "spring",
  stiffness: 250,
  damping: 10,
  mass: 0.5,
};

const variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition,
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition,
  },
};

const SnackBar = ({ children, severity, open, setOpen, duration = 8000 }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (open) {
      var timeout = setTimeout(() => setOpen(false), duration);
    }

    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="initial"
          animate="visible"
          exit="exit"
          variants={variants}
          className={`snackbar ${severity} ${theme}`}
        >
          <div className="icon">
            {severity === "error" ? (
              <Error />
            ) : severity === "warning" ? (
              <Warning />
            ) : (
              <CheckCircle />
            )}
          </div>
          <p>{children}</p>
          <div className="close" onClick={() => setOpen(false)}>
            <CloseRounded />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SnackBar;
