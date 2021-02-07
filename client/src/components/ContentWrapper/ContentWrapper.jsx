import React from "react";
import "./ContentWrapper.scss";

const ContentWrapper = ({ children }) => (
  <article className="acontent">{children}</article>
);

export default ContentWrapper;
