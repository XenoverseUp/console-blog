import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@material-ui/icons";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useCurrentWidth } from "../../hooks";
import "./HorizontalScroll.scss";

const HorizontalScroll = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);

  const [width] = useCurrentWidth();

  const x = useMotionValue(0);
  const leftTransform = useTransform(x, [-40, 0, sliderWidth], [1, 0, 0]);
  const rightTransform = useTransform(
    x,
    [-sliderConstraints + 40, -sliderConstraints + 80, sliderWidth],
    [0, 1, 1]
  );

  const animation = useAnimation();
  const physics = { type: "spring", stiffness: 200, mass: 1, damping: 15 };

  useEffect(() => {
    const calcSliderChildrenWidth = () => {
      setSliderChildrenWidth(
        Array.from(ref.current.childNodes).reduce(
          (acc, node) => acc + node?.clientWidth,
          0
        )
      );
    };

    calcSliderChildrenWidth();

    const calcSliderWidth = () => {
      setSliderWidth(ref.current?.clientWidth);
    };

    calcSliderWidth();
    window.addEventListener("resize", calcSliderWidth);

    const calcSliderConstraints = () => {
      setSliderConstraints(sliderChildrenWidth - sliderWidth);
    };

    calcSliderConstraints();
    window.addEventListener("resize", calcSliderConstraints);

    return () => {
      window.removeEventListener("resize", calcSliderWidth);
      window.removeEventListener("resize", calcSliderConstraints);
    };
  }, [ref, sliderChildrenWidth, sliderWidth]);

  const goToStart = () =>
    animation.start({
      x: 0,
      transition: physics,
    });

  const goToEnd = () =>
    animation.start({
      x: -sliderConstraints,
      transition: physics,
    });

  return (
    <div className="horizontal-scroll">
      <div className="main-horizontal-container">
        <motion.div
          ref={ref}
          drag="x"
          dragConstraints={{
            left: -sliderConstraints,
            right: 0,
          }}
          style={{ x }}
          initial={false}
          animate={animation}
          className="scroller"
        >
          {children}
        </motion.div>
      </div>
      {width > 600 && (
        <>
          <motion.button
            style={{ scale: leftTransform }}
            className={`category-controllers start ${theme}`}
            onClick={goToStart}
          >
            <KeyboardArrowLeftRounded />
          </motion.button>

          <motion.button
            style={{ scale: rightTransform }}
            className={`category-controllers end ${theme}`}
            onClick={goToEnd}
          >
            <KeyboardArrowRightRounded />
          </motion.button>
        </>
      )}
    </div>
  );
};

export default HorizontalScroll;
