import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./Footer.scss";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return <footer className={`footer ${theme}`}></footer>;
};

export default Footer;
