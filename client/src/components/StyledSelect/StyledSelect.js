import React, { useContext } from "react";
import { Select } from "@material-ui/core";
import { ThemeContext } from "../../contexts/ThemeContext";

const LightTheme = React.lazy(() => import("./Light"));
const DarkTheme = React.lazy(() => import("./Dark"));

const StyledSelect = ({ children, register, ...rest }) => {
  const { theme } = useContext(ThemeContext);

  const selectStyles = {
    background: theme === "dark" ? "#1f1f1f" : "white",
    color: theme === "dark" ? "#f5f5f5" : "#252525",
    fontFamily: "Raleway",
    fontWeight: 400,
    height: "3rem",
    marginTop: ".2rem",
    marginBottom: ".2rem",
  };

  return (
    <div className="styled-select">
      <React.Suspense fallback={<>Loading</>}>
        {theme === "light" && <LightTheme />}
        {theme === "dark" && <DarkTheme />}
      </React.Suspense>
      <Select
        ref={register}
        style={selectStyles}
        {...rest}
        className={`select ${theme}`}
      >
        {children}
      </Select>
    </div>
  );
};

export default StyledSelect;
