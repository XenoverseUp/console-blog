import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./DrawerHeader.scss";

const DrawerHeader = ({ commentLength }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <header className={`drawer-header ${theme}`}>
      <h1>
        Yorumlar
        <span
          style={
            commentLength < 99
              ? { width: "2rem", height: "2rem", padding: 0 }
              : null
          }
        >
          {commentLength}
        </span>
      </h1>
    </header>
  );
};

export default DrawerHeader;
