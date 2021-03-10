import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollContext } from "../contexts/ScrollContext";

const useScrollMemory = (key, native) => {
  const ref = useCallback((node) => {
    console.log(node);

    return () => {
      console.log(node, "gone");
    };
  }, []);

  return [ref];
};

export default useScrollMemory;
