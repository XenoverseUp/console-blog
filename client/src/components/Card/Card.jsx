import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
// import BlogServices from "../../services/BlogServices";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import "./Card.scss";

const Card = ({ imgSrc, id, title, author }) => {
  const { theme } = useContext(ThemeContext);

  const [isBookmarked, setIsBookmarked] = useState("true");

  return (
    <div className={`card ${theme}`}>
      <Link
        to={`/blog/${id}`}
        className="cover"
        style={{ background: `url("${imgSrc}") no-repeat center / cover` }}
      ></Link>

      <Link to={`/blog/${id}`} className="title">
        <p>
          {title.split(" ").length > 9
            ? title.split(" ").slice(0, 9).join(" ") + "..."
            : title}
        </p>

        <span>{author}</span>
      </Link>

      <Button
        style={theme === "dark" ? { color: "#f5f5f5" } : { color: "#252525" }}
        onClick={() => {
          setIsBookmarked(!isBookmarked);

          setTimeout(() => {
            if (isBookmarked) {
              // BlogServices.unBookmarkBlog(id);
              console.log("unBookmarked!");
            } else {
              //  BlogServices.bookmarkBlog(id);
              console.log("bookmarked!");
            }
          }, 0);
        }}
      >
        {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
      </Button>
    </div>
  );
};

export default Card;
