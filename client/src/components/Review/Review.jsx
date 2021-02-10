import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getCategory, getMonth } from "../../hooks";
import { CategoryContext } from "../../contexts/CategoryContext";
import {
  BookmarkBorderRounded,
  CloseRounded,
  FavoriteBorderRounded,
  KeyboardArrowLeftRounded,
  PublishRounded,
  Twitter,
  Instagram,
  Facebook,
  Brightness1Rounded,
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { SnackBar, Button } from "../../components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

const Review = ({
  review,
  formData,
  coverURL,
  setActiveMenu,
  uploadError,
  setUploadError,
}) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const categories = useContext(CategoryContext);

  const date = new Date();

  const duration = formData.content
    ? Math.ceil(formData.content.length / 800)
    : 0;

  return (
    <div ref={review} className={`review ${theme}`}>
      <SnackBar severity="error" open={uploadError} setOpen={setUploadError}>
        Ooops! Sunucuda bir hata oluştu. Tekrar dene.
      </SnackBar>
      <main>
        <div className="form-header">
          <div className="indicator">
            <Link to="/editor" className="close">
              <CloseRounded />
            </Link>
            <p>
              Yazı Oluşturun <span>(Adım 4/4)</span>
            </p>
          </div>
          <h1>Son olarak yazıyı gözden geçirip yayınlayalım.</h1>
        </div>
        <div className="review-content">
          <header>
            <h1>{formData.title}</h1>
            <p className="subtitle">{formData.subtitle}</p>
            <div className="info">
              <p>{user.userName}</p>
              <Brightness1Rounded />
              <p> {duration} dk </p>
              <Brightness1Rounded />
              <p className="category">
                {getCategory(formData.category, categories)[0]}
              </p>
            </div>
            <img src={coverURL} className="coverImage" alt="cover"></img>
          </header>

          <article>
            <div className="toolbar">
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
                  placement="right"
                >
                  <div className="like">
                    <FavoriteBorderRounded />
                    <p>{Math.floor(Math.random() * 20) + 5}</p>
                  </div>
                </Tooltip>

                <Tooltip
                  enterDelay={500}
                  leaveDelay={250}
                  title="Ayraçla"
                  placement="right"
                >
                  <div className="bookmark">
                    <BookmarkBorderRounded />
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
            <div
              className="main-content"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            ></div>
          </article>
        </div>
        <div className="controllers">
          <Button
            type="button"
            leftIcon={<KeyboardArrowLeftRounded />}
            onClick={() => {
              review.current.style.display = "none";
              setActiveMenu("content");
              setTimeout(
                () =>
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  }),
                0
              );
            }}
          >
            Önceki Adım
          </Button>

          <div className="seperator"></div>

          <Button type="submit" rightIcon={<PublishRounded />}>
            Yayınla
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Review;
