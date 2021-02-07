import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getCategory, getTimeDifferenceString } from "../../hooks";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import "./HomeBlogCard.scss";
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  Face,
  FiberManualRecord,
  Visibility,
} from "@material-ui/icons";
import { ReactComponent as MenuBookRounded } from "../../assets/img/views.svg";
import { Link } from "react-router-dom";

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
}) => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const categories = useContext(CategoryContext);
  const [, categoryObj] = getCategory(category, categories);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

  const timeDifferenceString = getTimeDifferenceString(createdAt);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Make Api Call
  };

  return (
    <div className={`home-blog-card ${theme}`}>
      <div className="left">
        <div className="circle" style={{ background: categoryObj.gradient }}>
          {categoryObj.icon}
        </div>
        <p>{timeDifferenceString}</p>
      </div>
      <div className="right">
        <div className="cover">
          <div
            className="img"
            style={{
              background: `url("${coverImagePath}") no-repeat center / cover`,
            }}
          ></div>
        </div>
        <div className="content">
          <section>
            <Link to={{ pathname: `/blog/${id}` }}>
              <header>
                <h4>{title}</h4>

                <ResponsiveEllipsis text={subtitle} maxLine={2} />
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
                      style={{ fill: theme === "dark" ? "#f5f5f5" : "#252525" }}
                    />
                  </span>
                  {views} okunma
                </p>
              </div>

              <div
                className="bookmark"
                onClick={() =>
                  !isAuthenticated ? setAuthModal(true) : handleBookmark()
                }
              >
                {isBookmarked ? <BookmarkRounded /> : <BookmarkBorderRounded />}
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeBlogCard;
