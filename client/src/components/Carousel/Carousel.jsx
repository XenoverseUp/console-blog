import { Children, cloneElement, useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@material-ui/icons";

import tapping from "../../animations/tapping";
import "./Carousel.scss";
import { ThemeContext } from "../../contexts/ThemeContext";

const Carousel = ({
  children,
  autoMove,
  swipeable,
  wheelable,
  autoMoveTimeout = 6000,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState("");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const touchPrecision = 75;

  const { theme } = useContext(ThemeContext);

  const elements = Children.toArray(children);
  const { length } = elements;

  let updatedElements = [];

  useEffect(() => {
    if (direction === "up") setSlides();
    else if (direction === "down") setSlides("backwards");
  }, [direction]);

  const setSlides = (direction) => {
    switch (direction) {
      case "backwards":
        if (activeSlide === 0) setActiveSlide(length - 1);
        else setActiveSlide(activeSlide - 1);
        break;
      default:
        if (activeSlide === length - 1) setActiveSlide(0);
        else setActiveSlide(activeSlide + 1);
        break;
    }
  };

  const handleWheel = (e) => {
    e.stopPropagation();

    if (e.deltaX > 0) {
      setDirection("up");
    } else if (e.deltaX < 0) {
      setDirection("down");
    } else setDirection("");
  };

  const handleTouchStart = (event) => {
    setTouchStart(event.targetTouches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > touchPrecision) setSlides();
    else if (touchStart - touchEnd < -touchPrecision) setSlides("backwards");
  };

  for (let i = 0; i < length; i++) {
    let updatedElement = cloneElement(elements[i], {
      slideId: i,
      setSlides,
      activeSlide,
      autoMove,
      autoMoveTimeout,
      key: i,
    });

    updatedElements = [...updatedElements, updatedElement];
  }

  return (
    <div className="outer">
      <div
        className={`carousel`}
        onWheel={wheelable && handleWheel}
        onTouchStart={swipeable && handleTouchStart}
        onTouchMove={swipeable && handleTouchMove}
        onTouchEnd={swipeable && handleTouchEnd}
      >
        <main>
          <AnimatePresence exitBeforeEnter>
            {updatedElements.map(
              (element, i) =>
                activeSlide === updatedElements[i].props.slideId && element
            )}
          </AnimatePresence>
        </main>
      </div>
      <div className={`controllers ${theme}`}>
        <motion.button
          whileTap={tapping}
          onClick={() => setSlides("backwards")}
        >
          <KeyboardArrowLeftRounded />
        </motion.button>
        <div className="separator"></div>
        <motion.button whileTap={tapping} onClick={() => setSlides()}>
          <KeyboardArrowRightRounded />
        </motion.button>
      </div>
    </div>
  );
};

export default Carousel;
