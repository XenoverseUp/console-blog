import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import AuthServices from "../../services/AuthServices";
import {
  LoginFormInput,
  SnackBar,
  SplitText,
  Button,
  ConditionalSimpleBar,
} from "../../components";
import { useForm } from "react-hook-form";
import { loginValidationSchema } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlternateEmail,
  LockOutlined,
  KeyboardArrowLeft,
} from "@material-ui/icons";
import LoginImg from "../../assets/img/login.png";
import "./Login.scss";
import { motion } from "framer-motion";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import tapping from "../../animations/tapping";
import { useMutation } from "react-query";
import BlogServices from "../../services/BlogServices";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const history = useHistory();
  const location = useLocation();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [cannotFound, setCannotFound] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const image = new Image();
    image.onload = () => setIsImgLoaded(true);
    image.src = LoginImg;

    return () => {
      image.onload = null;
    };
  }, []);

  const {
    mutateAsync: login,
    isLoading: isLoadingLogin,
    isError,
  } = useMutation(AuthServices.login);
  const {
    mutateAsync: authenticate,
    isLoading: isLoadingAuthenticate,
  } = useMutation(AuthServices.isAuthenticated);

  const onSubmit = async (data) => {
    await login(data);

    const { user, isAuthenticated } = await authenticate();

    if (!isAuthenticated) return setCannotFound(true);

    setUser(user);
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <ConditionalSimpleBar>
      <motion.div
        className={`login ${theme}`}
        variants={translateDownAndFadeOut}
        initial="initial"
        animate="visible"
        exit="exit"
        onAnimationStart={() => (document.body.style.overflow = "hidden")}
        onAnimationComplete={() => (document.body.style.overflow = "auto")}
      >
        <motion.div
          onClick={() =>
            history.push({ pathname: "/", state: { from: location.pathname } })
          }
          whileTap={tapping}
          style={{ cursor: "pointer" }}
          className="back"
        >
          <KeyboardArrowLeft /> <p>Ana sayfa</p>
        </motion.div>

        <SnackBar open={cannotFound} setOpen={setCannotFound} severity="error">
          Maalesef bu kullanıcıyı bulamadık.
        </SnackBar>

        <div className="banner">
          {isImgLoaded ? (
            <motion.img
              initial={{ x: "20%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "20%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
              }}
              src={LoginImg}
              alt="Console"
            />
          ) : (
            "Loading..."
          )}
        </div>
        <div className="stripe">{"CONSOLE".repeat(6)}</div>
        <div className="content">
          <main>
            <header>
              <h1>
                <SplitText
                  initial={{ y: "100%" }}
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: (i) => ({
                      y: 0,
                      transition: {
                        delay: i * 0.1 + 0.1,
                        type: "spring",
                        stiffness: 150,
                      },
                    }),
                    exit: (i) => ({
                      y: "100%",
                      transition: {
                        delay: i * 0.1,
                        type: "tween",
                        duration: 0.5,
                      },
                    }),
                  }}
                >
                  Giriş Yap
                </SplitText>
              </h1>
              <p>"CONSOLE"a erişmek için giriş yapabilirsin.</p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <LoginFormInput
                name="email"
                register={register}
                errors={errors}
                theme={theme}
                leftIcon={<AlternateEmail />}
                autoComplete="off"
                visible={visible}
                setVisible={setVisible}
                cannotFound={cannotFound}
              />
              <LoginFormInput
                name="password"
                register={register}
                errors={errors}
                theme={theme}
                leftIcon={<LockOutlined />}
                autoComplete="off"
                visible={visible}
                setVisible={setVisible}
                cannotFound={cannotFound}
              />

              <Button type="submit">
                {isLoadingLogin || isLoadingAuthenticate ? (
                  <>
                    <CircularProgress
                      style={{
                        width: "1rem",
                        height: "1rem",
                        marginRight: ".5rem",
                        color: "#ff9900",
                      }}
                    />
                    Yükleniyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </form>
            <footer>
              Henüz bir hesabın yok mu? O zaman
              <Link to="/register" className="link">
                {" "}
                Hesap Oluştur
              </Link>
              .
            </footer>
          </main>
        </div>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Login;
