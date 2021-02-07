import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { sanitize } from "dompurify";

import "./SanitizedContent.scss";

const SanitizedContent = ({ content }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`main-content ${theme}`}
      dangerouslySetInnerHTML={{ __html: sanitize(content) }}
    ></div>
  );
};

export default SanitizedContent;
