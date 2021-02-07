import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export default ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
