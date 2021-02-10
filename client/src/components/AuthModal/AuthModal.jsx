import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SplitText } from "../../components";
import splitText from "../../animations/splitText";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import Overlay from "../Overlay/Overlay";
import modalVariants from "../../animations/modalVariants";
import Img from "../../assets/img/auth-modal.png";
import "./AuthModal.scss";
import { useHistory, useLocation } from "react-router-dom";
import { AccountCircle, Close, HowToReg } from "@material-ui/icons";

const AuthModal = ({ isOpen, setIsOpen }) => {
  const { theme } = useContext(ThemeContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Fragment>
          <Overlay onClick={() => setIsOpen(false)} />
          <motion.div
            initial="initial"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className={`auth-modal ${theme}`}
          >
            <Close onClick={() => setIsOpen(false)} />
            <section>
              <div className="banner">
                <img src={Img} alt="avatar" />
              </div>
              <main>
                <header>
                  <h3>
                    <SplitText
                      initial="initial"
                      animate="visible"
                      variants={splitText}
                    >
                      Bize Katıl
                    </SplitText>
                  </h3>
                  <p>
                    Yazıları ayraçlamak, beğenmek ve onlara yorum yapmak için
                    bize katıl.
                  </p>
                </header>

                <div className="controllers">
                  <button
                    onClick={() => {
                      setIsOpen(false);

                      setTimeout(
                        () =>
                          history.push({
                            pathname: "/login",
                            state: { from: location.pathname },
                          }),
                        250
                      );
                    }}
                  >
                    <HowToReg />
                    <span>Giriş yap</span>
                  </button>

                  <span>veya</span>

                  <button
                    onClick={() => {
                      setIsOpen(false);

                      setTimeout(
                        () =>
                          history.push({
                            pathname: "/register",
                            state: { from: location.pathname },
                          }),
                        250
                      );
                    }}
                  >
                    <AccountCircle />
                    <span>Hesap Oluştur</span>
                  </button>
                </div>
              </main>
            </section>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
