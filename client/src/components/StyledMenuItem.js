import React from "react";
import { MenuItem } from "@material-ui/core";

const StyledMenuItem = ({ children, ...rest }) => {
  const styles = { fontFamily: "Raleway", fontWeight: 500 };

  return (
    <MenuItem style={styles} {...rest}>
      {children}
    </MenuItem>
  );
};

export default StyledMenuItem;
