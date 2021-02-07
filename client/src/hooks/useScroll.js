import { useEffect } from "react";

const useScroll = ({ x = 0, y = 0, duration = 0 }) => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
};

export default useScroll;
