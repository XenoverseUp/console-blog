import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./ThemeToggle.scss";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggle = (initial, a, b) => (initial === a ? b : a);

  return (
    <div className="toggle-container">
      <div
        className={`switch ${theme}`}
        onClick={() => setTheme(toggle(theme, "light", "dark"))}
      >
        <div className="slider"></div>
      </div>
    </div>
  );
};

export default ThemeToggle;
