import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./TopCard.scss";
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  FiberManualRecord,
} from "@material-ui/icons";
import { AuthContext } from "../../contexts/AuthContext";

const TopCard = ({
  casual,
  title,
  subtitle,
  coverImagePath,
  author,
  id,
  views,
  setAuthModal,
  intersectionRef,
}) => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      className={`top-card ${theme}`}
      style={casual && { margin: ".7rem 0" }}
      {...(intersectionRef && { ref: intersectionRef })}
    >
      <Link to={{ pathname: `/blog/${id}` }} className="top">
        <div
          className="cover"
          style={{
            background: `url("${coverImagePath}") no-repeat center / cover `,
          }}
        ></div>
        <div className="info">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </Link>
      <div className="bottom">
        <div className="statistics">
          <div className="statistic">
            <p>
              {views}
              <span>okunma</span>
            </p>
          </div>
          <FiberManualRecord />

          <div className="author">{author}</div>
        </div>

        <div
          className="bookmark"
          onClick={() =>
            !isAuthenticated ? setAuthModal(true) : handleBookmark()
          }
        >
          {isBookmarked ? <BookmarkRounded /> : <BookmarkBorderRounded />}
        </div>
      </div>
    </div>
  );
};

export default TopCard;
