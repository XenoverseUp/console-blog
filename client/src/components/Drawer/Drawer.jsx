import { useContext } from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { ThemeContext } from "../../contexts/ThemeContext";
import ConditionalSimpleBar from "../ConditionalSimpleBar/ConditionalSimpleBar";

const Drawer = ({
  children,
  open,
  setOpen,
  anchor = "right",
  padding = true,
}) => {
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
      anchor={anchor}
      className={`custom-drawer ${theme}`}
    >
      <ConditionalSimpleBar>
        <main>
          <div
            className="paddingProvider"
            style={{
              padding: padding ? "1rem" : 0,
            }}
          >
            {children}
          </div>
        </main>
      </ConditionalSimpleBar>
    </SwipeableDrawer>
  );
};

export default Drawer;
