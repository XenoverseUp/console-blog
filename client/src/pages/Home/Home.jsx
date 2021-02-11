import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  Slide,
  TopCard,
  HorizontalScroll,
  CategoryCard,
  AuthModal,
  ConditionalSimpleBar,
  Preloader,
  ResponsiveNavBar,
} from "../../components";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./Home.scss";

import fakeData from "../../fakeData";
import { CategoryContext } from "../../contexts/CategoryContext";
import { useCurrentWidth } from "../../hooks";

const MobileSearch = lazy(() =>
  import("../../components/MobileSearch/MobileSearch")
);

const HomeBlogCard = lazy(() =>
  import("../../components/HomeBlogCard/HomeBlogCard")
);

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const categories = useContext(CategoryContext);

  const [width] = useCurrentWidth();

  const [authModal, setAuthModal] = useState(false);
  const [data, setData] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    setData(fakeData);
    setTopBlogs(fakeData.slice(0, 3));
  }, []); // Fetch data and set topBlogs

  return (
    <ConditionalSimpleBar>
      <motion.div
        variants={translateDownAndFadeOut}
        initial="initial"
        animate="visible"
        exit="exit"
        className="main-home-container"
      >
        <ResponsiveNavBar />
        <AuthModal setIsOpen={setAuthModal} isOpen={authModal} />

        <div className={`home ${theme}`}>
          <section>
            <Suspense fallback={<Preloader />}>
              {width < 600 && <MobileSearch />}
            </Suspense>

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
                    ({
                      title,
                      subtitle,
                      coverImagePath,
                      author,
                      id,
                      views,
                    }) => (
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
                    <CategoryCard
                      width={width}
                      key={i}
                      index={i}
                      category={category}
                    />
                  ))}
                </HorizontalScroll>
              </div>
              <div className="casual-blogs">
                <div className="blogs-container">
                  <Suspense fallback={<Preloader />}>
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
                      }) =>
                        width > 600 ? (
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
                        ) : (
                          <TopCard
                            casual
                            key={id}
                            title={title}
                            subtitle={subtitle}
                            coverImagePath={coverImagePath}
                            views={views}
                            id={id}
                            author={author}
                            setAuthModal={setAuthModal}
                          />
                        )
                    )}
                  </Suspense>
                </div>
                <div className="posibly-ads"></div>
              </div>
            </div>
            <footer></footer>
          </section>
        </div>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Home;
