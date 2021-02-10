import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  NavBar,
  Carousel,
  Slide,
  TopCard,
  HorizontalScroll,
  CategoryCard,
  HomeBlogCard,
  AuthModal,
} from "../../components";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./Home.scss";

import fakeData from "../../fakeData";
import { CategoryContext } from "../../contexts/CategoryContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const categories = useContext(CategoryContext);

  const [authModal, setAuthModal] = useState(false);

  const [data, setData] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    setData(fakeData);
    setTopBlogs(fakeData.slice(0, 3));
  }, []); // FetchData and setTopBlogs

  return (
    <motion.div
      variants={translateDownAndFadeOut}
      initial="initial"
      animate="visible"
      exit="exit"
      className="scroller"
    >
      <NavBar />
      <AuthModal setIsOpen={setAuthModal} isOpen={authModal} />
      <div className={`home ${theme}`}>
        <section>
          <div className="grid-container">
            <div className="carousel-wrapper">
              <Carousel swipeable>
                {data.slice(0, 4).map((blog, i) => (
                  <Slide
                    key={i}
                    coverImagePath={blog.coverImagePath}
                    category={blog.category}
                    title={blog.title}
                    subtitle={blog.subtitle}
                    id={blog.id}
                  />
                ))}
              </Carousel>
            </div>
            <div className="top-blogs">
              <header>
                <h1 className={theme}>
                  <span>En çok okunanlar</span>
                </h1>
              </header>
              <div className="top-blog-grid">
                {topBlogs.map(
                  ({ title, subtitle, coverImagePath, author, id, views }) => (
                    <TopCard
                      title={title}
                      subtitle={subtitle}
                      coverImagePath={coverImagePath}
                      author={author}
                      views={views}
                      id={id}
                      key={id}
                      setAuthModal={setAuthModal}
                    />
                  )
                )}
              </div>
            </div>
            <div className="categories">
              <header>
                <h4>Kategoriler</h4>
              </header>
              <HorizontalScroll>
                {categories.map((category, i) => (
                  <CategoryCard key={i} index={i} category={category} />
                ))}
              </HorizontalScroll>
            </div>
            <div className="casual-blogs">
              <div className="blogs-container">
                {data.map(
                  ({
                    title,
                    subtitle,
                    coverImagePath,
                    category,
                    views,
                    id,
                    author,
                    createdAt,
                  }) => (
                    <HomeBlogCard
                      key={id}
                      title={title}
                      subtitle={subtitle}
                      coverImagePath={coverImagePath}
                      category={category}
                      views={views}
                      id={id}
                      author={author}
                      createdAt={createdAt}
                      setAuthModal={setAuthModal}
                    />
                  )
                )}
              </div>
              <div className="posibly-ads"></div>
            </div>
          </div>
          <footer></footer>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
