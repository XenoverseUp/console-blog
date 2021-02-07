import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AllInclusive, CloseRounded } from "@material-ui/icons";

import Menu from "./Menu";

import "./MobileMenu.scss";

const MobileMenu = ({ open, setOpen }) => {
  const { theme } = useContext(ThemeContext);
  const date = new Date();

  if (!open) return null;
  return createPortal(
    <div className={`mobile-menu-container ${theme}`}>
      <div
        className="close"
        onClick={() => setTimeout(() => setOpen(!open), 200)}
      >
        <CloseRounded
          style={theme === "dark" ? { fill: "#f9f9f9" } : { fill: "#252525" }}
        />
      </div>
      <header>
        <AllInclusive
          style={theme === "dark" ? { fill: "#f9f9f9" } : { fill: "#252525" }}
        />
        <h1>CONSOLE</h1>
      </header>
      <Menu setOpen={setOpen} />
      <footer>
        <span>CONSOLE</span> by Xenoverse &copy; {date.getFullYear()}
      </footer>
    </div>,
    document.getElementById("mobile-menu")
  );
};

export default MobileMenu;
