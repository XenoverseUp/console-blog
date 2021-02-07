import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./BlogContainer.scss";

const BlogContainer = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return <main className={`main-blog-container ${theme}`}>{children}</main>;
};

export default BlogContainer;
