import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Overlay from "../Overlay/Overlay";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../Button/Button";

import "./PromptModal.scss";
import SplitText from "../SplitText";
import splitText from "../../animations/splitText";
import modalVariants from "../../animations/modalVariants";

const PromptModal = ({
  isOpen,
  setIsOpen,
  severity = "success",
  icon,
  children,
  title,
  action,
  choices: { positive, negative = "Vazgeç" },
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <React.Fragment>
          <Overlay onClick={() => setIsOpen(false)} />
          <motion.div
            className={`modal ${theme} ${severity}`}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <section>{icon}</section>

            <section>
              <div className="content">
                <h1>
                  <SplitText
                    variants={splitText}
                    initial="initial"
                    animate="visible"
                  >
                    {title}
                  </SplitText>
                </h1>
                <p>{children}</p>
              </div>

              <div className={`action-buttons ${severity}`}>
                <button onClick={() => setIsOpen(false)}>{negative}</button>

                <Button type="button" onClick={action} rightIcon={icon}>
                  {positive}
                </Button>
              </div>
            </section>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default PromptModal;
