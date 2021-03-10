import { createContext, useState } from "react";

export const ScrollContext = createContext();

const ScrollProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <ScrollContext.Provider value={{ state, setState }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
