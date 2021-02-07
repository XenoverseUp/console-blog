import React, { useContext, useEffect } from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AnimateSharedLayout, motion } from "framer-motion";

const Drawer = ({ children, open, setOpen }) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { theme } = useContext(ThemeContext);

  return (
    <SwipeableDrawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
      }}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="right"
      className={`custom-drawer ${theme}`}
    >
      <main>
        <AnimateSharedLayout>
          <motion.div
            className="paddingProvider"
            style={{
              padding: "1rem",
            }}
            layout
            layoutId="comments"
          >
            {children}
          </motion.div>
        </AnimateSharedLayout>
      </main>
    </SwipeableDrawer>
  );
};

export default Drawer;
