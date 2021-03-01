import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getCategory, getTimeDifferenceString } from "../../hooks";

import "./HomeBlogCard.scss";
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  Face,
  Schedule,
} from "@material-ui/icons";
import { ReactComponent as MenuBookRounded } from "../../assets/img/views.svg";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import BlogServices from "../../services/BlogServices";

const HomeBlogCard = ({
  title,
  subtitle,
  coverImagePath,
  category,
  views,
  id,
  author,
  createdAt,
  setAuthModal,
  intersectionRef,
  isBookmarked,
  queryClient,
}) => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const categories = useContext(CategoryContext);
  const [, categoryObj] = getCategory(category, categories);
  const [isCurrentBookmarked, setIsCurrentBookmarked] = useState(false);
  const location = useLocation();

  const timeDifferenceString = getTimeDifferenceString(createdAt);

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
      await queryClient.invalidateQueries("top-blogs");
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
      className={`home-blog-card ${theme}`}
      {...(intersectionRef && { ref: intersectionRef })}
    >
      <div className="left">
        <div className="circle" style={{ background: categoryObj.gradient }}>
          {categoryObj.icon}
        </div>
        <p>{timeDifferenceString}</p>
      </div>
      <div className="right">
        <div className="main-content">
          <div className="cover">
            <Link
              to={{
                pathname: `/blog/${id}`,
                state: { from: location.pathname },
              }}
            >
              <div
                className="img"
                style={{
                  background: `url("${coverImagePath}") no-repeat center / cover`,
                }}
              ></div>
            </Link>
          </div>
          <div className="content">
            <section>
              <Link
                to={{
                  pathname: `/blog/${id}`,
                  state: { from: location.pathname },
                }}
              >
                <header>
                  <h4>{title}</h4>

                  <p>{subtitle}</p>
                </header>
              </Link>
              <main>
                <div className="statistics">
                  <p>
                    <span>
                      <Face />
                    </span>
                    {author}
                  </p>

                  <p>
                    <span>
                      <MenuBookRounded
                        style={{
                          fill: theme === "dark" ? "#f5f5f5" : "#252525",
                        }}
                      />
                    </span>
                    {views} okunma
                  </p>
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
              </main>
            </section>
          </div>
        </div>
        <div className="date">
          <Schedule />
          {timeDifferenceString}
        </div>
      </div>
    </div>
  );
};

export default HomeBlogCard;
