import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import Overlay from "../Overlay/Overlay";

const AuthModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Fragment>
          <Overlay onClick={() => setIsOpen(false)} />
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
