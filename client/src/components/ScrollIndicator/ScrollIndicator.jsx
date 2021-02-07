import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./ScrollIndicator.scss";

const ScrollIndicator = ({ onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`mouse-scroll ${theme}`} onClick={onClick}>
      <span className="mouse">
        <span className="mouse-movement"></span>
      </span>
      <span className="mouse-message fadeIn">kaydır</span>
    </div>
  );
};

export default ScrollIndicator;
