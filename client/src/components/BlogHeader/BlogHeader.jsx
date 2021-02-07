import React, { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { getCategory } from "../../hooks";
import { Brightness1Rounded } from "@material-ui/icons";

import "./BlogHeader.scss";

const BlogHeader = ({
  title,
  subtitle,
  authorName,
  duration,
  category,
  coverImagePath,
}) => {
  const categories = useContext(CategoryContext);

  return (
    <header className="blog-header">
      <div className="head">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="info">
          <p>{authorName}</p>
          <p> {duration} dk </p>
          <Brightness1Rounded />
          <p>{getCategory(category, categories)[0]}</p>
        </div>
      </div>
      <img src={coverImagePath} alt={title} />
    </header>
  );
};

export default BlogHeader;
