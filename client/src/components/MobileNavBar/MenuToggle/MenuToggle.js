import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./MenuToggle.scss";

const MenuToggle = ({ isOpen, setIsOpen }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`menu-toggle ${isOpen ? "active" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`hamburger ${theme}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default MenuToggle;
