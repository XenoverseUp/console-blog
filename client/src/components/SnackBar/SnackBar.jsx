import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import PropTypes from "prop-types";
import { CheckCircle, Error, Warning, CloseRounded } from "@material-ui/icons";
import "./SnackBar.scss";

const SnackBar = ({ children, severity, open, setOpen, duration = 8000 }) => {
  const { theme } = useContext(ThemeContext);
  const mainRef = useRef(null);

  const setExitAnimation = () => {
    if (mainRef && mainRef.current) {
      mainRef.current.style.animation =
        "exit 0.25s cubic-bezier(0.75, -0.5, 0, 1.75)";
    }
  };

  if (open) {
    setTimeout(() => {
      setExitAnimation();
      setTimeout(() => setOpen(false), 250);
    }, duration);
  }

  if (!open) return null;

  return (
    <div className={`snackbar ${severity} ${theme}`} ref={mainRef}>
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
      <div
        className="close"
        onClick={() => {
          setExitAnimation();
          setTimeout(() => setOpen(false), 250);
        }}
      >
        <CloseRounded />
      </div>
    </div>
  );
};

SnackBar.propTypes = {
  severity: PropTypes.oneOf(["success", "error", "warning"]),
  duration: PropTypes.number,
  open: PropTypes.bool,
};

export default SnackBar;
