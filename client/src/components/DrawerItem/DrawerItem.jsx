import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Face } from "@material-ui/icons";
import { getTimeDifferenceString } from "../../hooks";
import { motion } from "framer-motion";
import "./DrawerItem.scss";

const DrawerItem = ({ postedBy, createdAt, children }) => {
  const { theme } = useContext(ThemeContext);

  const timeString = getTimeDifferenceString(createdAt);

  return (
    <motion.div layout className={`drawer-item ${theme}`}>
      <header>
        <Face />
        <div className="comment-info">
          <h4>{postedBy}</h4>
          <p>{timeString}</p>
        </div>
      </header>
      <main>{children}</main>
    </motion.div>
  );
};

export default DrawerItem;
