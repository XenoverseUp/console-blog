import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./TopCard.scss";
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  FiberManualRecord,
} from "@material-ui/icons";
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation } from "react-query";
import BlogServices from "../../services/BlogServices";

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
  isBookmarked,
  queryClient,
}) => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isCurrentBookmarked, setIsCurrentBookmarked] = useState(false);

  const { mutateAsync: bookmark, isLoading: isBookmarkLoading } = useMutation(
    BlogServices.bookmarkBlog,
    {
      onMutate: async () => {
        await queryClient.cancelQueries("home-blogs");
        await queryClient.cancelQueries("top-blogs");
        setIsCurrentBookmarked(true);
      },

      onSettled: () => {
        queryClient.invalidateQueries("home-blogs");
        queryClient.invalidateQueries("top-blogs");
      },
    }
  );

  const {
    mutateAsync: unbookmark,
    isLoading: isUnbookmarkLoading,
  } = useMutation(BlogServices.unBookmarkBlog, {
    onMutate: async () => {
      await queryClient.cancelQueries("home-blogs");
      await queryClient.cancelQueries("top-blogs");
      setIsCurrentBookmarked(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries("home-blogs");
      queryClient.invalidateQueries("top-blogs");
    },
  });

  const bookmarkClick = async () => {
    if (isBookmarkLoading || isUnbookmarkLoading) return;
    if (isBookmarked) {
      await unbookmark(id);
    } else {
      await bookmark(id);
    }
  };

  useEffect(() => setIsCurrentBookmarked(isBookmarked), [isBookmarked]);

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
            isAuthenticated ? bookmarkClick() : setAuthModal(true)
          }
        >
          {isCurrentBookmarked ? (
            <BookmarkRounded />
          ) : (
            <BookmarkBorderRounded />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCard;
