import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import BlogServices from "../../services/BlogServices";
import { Card } from "../../components";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { NavBar } from "../../components";
import "./Bookmarked.scss";
import isEmpty from "is-empty";
import FakeData from "../../fakeData";
import { motion } from "framer-motion";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";

const Bookmarked = () => {
  const { theme } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(FakeData);
    // const fetchApi = async () => {
    //   const { blogs } = await BlogServices.getBookmarkedBlogs();
    //   setBlogs(blogs);
    // };
    // fetchApi();
  }, []);

  return (
    <motion.div
      variants={translateDownAndFadeOut}
      initial="initial"
      animate="visible"
      exit="exit"
      onAnimationStart={() => (document.body.style.overflow = "hidden")}
      onAnimationComplete={() => (document.body.style.overflow = "auto")}
    >
      <NavBar />
      <div className={`bookmarked ${theme}`}>
        {isEmpty(blogs) ? (
          <div className="void">
            <div className="icon">
              <BookmarkBorder />
            </div>

            <p>
              Henüz ayracın boş. Daha sonra okumak için yazıları ayracına
              ekleyebilirsin.
            </p>
          </div>
        ) : (
          <div className="bookmarked-container">
            <main>
              <h1>
                <Bookmark /> Ayracım
              </h1>
              {blogs.map(({ title, _id, coverImagePath, author }) => (
                <Card
                  title={title}
                  id={_id}
                  imgSrc={coverImagePath}
                  author={author}
                  key={title}
                />
              ))}
            </main>
          </div>
        )}
      </div>{" "}
    </motion.div>
  );
};

export default Bookmarked;
