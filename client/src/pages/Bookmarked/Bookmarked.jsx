import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import BlogServices from "../../services/BlogServices";
import { Card, ConditionalSimpleBar, Preloader } from "../../components";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { ResponsiveNavBar } from "../../components";
import "./Bookmarked.scss";
import isEmpty from "is-empty";
import { AnimateSharedLayout, motion } from "framer-motion";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import { useInfiniteQuery, useQueryClient } from "react-query";

const Bookmarked = () => {
  const { theme } = useContext(ThemeContext);

  const {
    data,
    isLoading,
    isFetching,
    isIdle,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["bookmarked-blogs"], BlogServices.getBookmarkedBlogs, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.nextPage;
    },
  });

  const queryClient = useQueryClient();

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting && fetchNextPage();
      },
      {
        threshold: 0.2,
      }
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

  return isLoading || isIdle ? (
    <Preloader />
  ) : (
    <ConditionalSimpleBar>
      <motion.div
        variants={translateDownAndFadeOut}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        <ResponsiveNavBar />
        <div className={`bookmarked ${theme}`}>
          {isEmpty(data.pages[0].docs) ? (
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
                <AnimateSharedLayout>
                  {data.pages.map(({ docs }, i, pages) =>
                    docs.map(
                      ({ title, _id, coverImagePath, author }, j, docs) => (
                        <Card
                          title={title}
                          id={_id}
                          imgSrc={coverImagePath}
                          author={author.userName}
                          key={"bookmarked" + title}
                          queryClient={queryClient}
                          intersectionRef={
                            hasNextPage &&
                            i === pages.length - 1 &&
                            j === docs.length - 2 &&
                            setElement
                          }
                        />
                      )
                    )
                  )}
                </AnimateSharedLayout>
              </main>
            </div>
          )}
        </div>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Bookmarked;
