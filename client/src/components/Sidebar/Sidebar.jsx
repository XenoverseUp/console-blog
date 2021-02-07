import React, { useContext } from "react";
import { Tooltip } from "@material-ui/core";
import {
  FavoriteBorderRounded,
  BookmarkBorderRounded,
  Instagram,
  Facebook,
  Twitter,
  CommentOutlined,
  FavoriteRounded,
  BookmarkRounded,
} from "@material-ui/icons";
import { getMonth, useCurrentWidth } from "../../hooks";
import "./Sidebar.scss";
import { ThemeContext } from "../../contexts/ThemeContext";

const Sidebar = ({
  isLiked = false,
  isBookmarked = false,
  comments = 0,
  date,
  likes,
  top = 6,
  callbacks,
}) => {
  const { theme } = useContext(ThemeContext);

  let [width] = useCurrentWidth();

  return (
    <div className={`toolbar ${theme}`} style={{ top: `${top}rem` }}>
      <div className="date">
        <div className="day">
          {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
        </div>
        <div className="month">{getMonth(date)}</div>
        <div className="year">{date.getFullYear()}</div>
      </div>

      <div className="separator"></div>

      <div className="actions">
        <Tooltip
          enterDelay={150}
          leaveDelay={500}
          title="Beğen"
          placement={width > 600 ? "right" : "bottom"}
        >
          <div className="like" onClick={callbacks?.onLikeClick}>
            {isLiked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            <p>{likes}</p>
          </div>
        </Tooltip>

        {width > 600 && (
          <Tooltip
            enterDelay={150}
            leaveDelay={500}
            title="Yorum Yap"
            placement="right"
          >
            <div className="comments" onClick={callbacks?.onCommentClick}>
              <CommentOutlined />
              <p>{`${comments}`}</p>
            </div>
          </Tooltip>
        )}

        <Tooltip
          enterDelay={150}
          leaveDelay={500}
          title="Ayraçla"
          placement={width > 600 ? "right" : "bottom"}
        >
          <div className="bookmark" onClick={callbacks?.onBookmarkClick}>
            {isBookmarked ? <BookmarkRounded /> : <BookmarkBorderRounded />}
          </div>
        </Tooltip>
      </div>

      <div className="separator"></div>

      <div className="share">
        <div className="instagram">
          <Instagram />
        </div>
        <div className="twitter">
          <Twitter />
        </div>
        <div className="facebook">
          <Facebook />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
