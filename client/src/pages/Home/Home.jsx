import { useContext, useEffect, useState, lazy, Suspense, useRef } from "react";
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
import { useInfiniteQuery, useQuery } from "react-query";
import "./Home.scss";

import { CategoryContext } from "../../contexts/CategoryContext";
import { useCurrentWidth } from "../../hooks";
import BlogServices from "../../services/BlogServices";

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

  const { data: topData, isLoading: isTopLoading } = useQuery(
    "top-blogs",
    BlogServices.getTopBlogs
  );

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["home-blogs"], BlogServices.getAllPublishedBlogs, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.nextPage;
    },
  });

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting && fetchNextPage();
      },
      { threshold: 0.2 }
    )
  );
  const [element, setElement] = useState(null);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    currentElement && currentObserver.observe(currentElement);

    return () => {
      currentElement && currentObserver.unobserve(currentElement);
    };
  }, [element]);

  return isLoading || isTopLoading ? (
    <Preloader />
  ) : (
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
                  {data.pages[0].docs.slice(0, 4).map((doc) => (
                    <Slide
                      key={doc.coverImagePath}
                      coverImagePath={doc.coverImagePath}
                      category={doc.category}
                      title={doc.title}
                      subtitle={doc.subtitle}
                      id={doc._id}
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
                  {topData.map(
                    ({
                      title,
                      subtitle,
                      coverImagePath,
                      author: { userName },
                      _id,
                      views,
                    }) => (
                      <TopCard
                        title={title}
                        subtitle={subtitle}
                        coverImagePath={coverImagePath}
                        author={userName}
                        views={views}
                        id={_id}
                        key={"top" + title}
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
                  <Suspense fallback={"Loading..."}>
                    {data.pages.map(({ docs }, i, pages) => {
                      return docs.map(
                        (
                          {
                            title,
                            subtitle,
                            coverImagePath,
                            category,
                            views,
                            _id,
                            author: { userName },
                            createdAt,
                          },
                          j,
                          blogs
                        ) => {
                          if (i === 0 && [0, 1, 2, 3].includes(j)) return;
                          return width > 600 ? (
                            <HomeBlogCard
                              key={"home-blog" + title}
                              title={title}
                              subtitle={subtitle}
                              coverImagePath={coverImagePath}
                              category={category}
                              views={views}
                              id={_id}
                              author={userName}
                              createdAt={createdAt}
                              setAuthModal={setAuthModal}
                              intersectionRef={
                                hasNextPage &&
                                i === pages.length - 1 &&
                                j === blogs.length - 1 &&
                                setElement
                              }
                            />
                          ) : (
                            <TopCard
                              key={"top-blog-home" + title}
                              casual
                              title={title}
                              subtitle={subtitle}
                              coverImagePath={coverImagePath}
                              views={views}
                              id={_id}
                              author={userName}
                              setAuthModal={setAuthModal}
                              intersectionRef={
                                hasNextPage &&
                                i === pages.length - 1 &&
                                j === blogs.length - 1 &&
                                setElement
                              }
                            />
                          );
                        }
                      );
                    })}
                  </Suspense>
                </div>
                <div className="posibly-ads"></div>
              </div>
            </div>
            {!hasNextPage && <footer>Bitti amk</footer>}
          </section>
        </div>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Home;
