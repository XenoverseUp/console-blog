import { useState, useEffect } from "react";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const getHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

const useCurrentWidth = () => {
  let [width, setWidth] = useState(getWidth());
  let [height, setHeight] = useState(getHeight());

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
      setHeight(getHeight());
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return [width, height];
};

export default useCurrentWidth;
