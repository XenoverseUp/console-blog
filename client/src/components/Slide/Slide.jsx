import { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./Slide.scss";
import { getCategory } from "../../hooks";
import { CategoryContext } from "../../contexts/CategoryContext";
import carouselImageVariants from "../../animations/carouselImageVariants";
import carouselContentVariants from "../../animations/carouselContentVariants";
import idVariants from "../../animations/idVariants";

const Slide = ({
  coverImagePath,
  category,
  id,
  title,
  subtitle,
  slideId,
  autoMove,
  setSlides,
  autoMoveTimeout,
}) => {
  const location = useLocation();
  const history = useHistory();

  const { theme } = useContext(ThemeContext);
  const categories = useContext(CategoryContext);

  useEffect(() => {
    const timeout =
      autoMove &&
      setTimeout(() => {
        setSlides();
      }, autoMoveTimeout);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`slide ${theme}`}>
      <div className="content">
        <main>
          <header>
            <div className="legend">
              <motion.h2
                initial="initial"
                animate="visible"
                exit="exit"
                variants={idVariants}
              >
                {slideId < 10 ? "0" + (slideId + 1) : slideId + 1}
              </motion.h2>
              <p>{getCategory(category, categories)[0]}</p>
            </div>

            <motion.h1
              initial="initial"
              animate="visible"
              exit="exit"
              variants={carouselContentVariants(2, 0)}
            >
              {title.split(" ").length > 6
                ? title.split(" ").slice(0, 6).join(" ") + "..."
                : title}
            </motion.h1>
          </header>
          <motion.p
            initial="initial"
            animate="visible"
            exit="exit"
            variants={carouselContentVariants()}
          >
            {subtitle.split(" ").length > 17
              ? subtitle.split(" ").slice(0, 17).join(" ") + "..."
              : subtitle}
          </motion.p>
          <motion.div
            initial="initial"
            animate="visible"
            exit="exit"
            variants={{
              initial: {
                opacity: 0.7,
              },
              visible: {
                opacity: 1,
              },
              exit: {
                opacity: 0.7,
              },
            }}
            className="link"
            onClick={() =>
              history.push({
                pathname: `/blog/${id}`,
                state: { from: location.pathname },
              })
            }
          >
            Yazıyı Oku
          </motion.div>
        </main>
      </div>
      <div className="cover">
        <motion.div
          initial="initial"
          animate="visible"
          exit="exit"
          variants={carouselImageVariants}
          className="bg-container"
          style={{
            background: `url("${coverImagePath}") no-repeat center / cover`,
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Slide;
