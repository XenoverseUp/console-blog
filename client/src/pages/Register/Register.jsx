import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import AuthServices from "../../services/AuthServices";
import {
  RegisterFormInput,
  SnackBar,
  SplitText,
  Button,
  ConditionalSimpleBar,
} from "../../components";
import { useForm } from "react-hook-form";
import { registerValidationSchema } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlternateEmail,
  ConfirmationNumberOutlined,
  Face,
  LockOutlined,
  KeyboardArrowLeft,
} from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import RegistreImg from "../../assets/img/register.png";
import "./Register.scss";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import translateDownAndFadeOut from "../../animations/translateDownAndFadeOut";
import tapping from "../../animations/tapping";
import splitText from "../../animations/splitText";

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const history = useHistory();
  const location = useLocation();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setIsImgLoaded(true);
    image.src = RegistreImg;

    return () => {
      image.onload = null;
    };
  }, []);

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: "onSubmit",
  });

  const {
    mutateAsync: registerUser,
    isLoading: isLoadingRegister,
  } = useMutation(AuthServices.register);

  const { mutateAsync: login, isLoading: isLoadingLogin } = useMutation(
    AuthServices.login
  );

  const {
    mutateAsync: authenticate,
    isLoading: isLoadingAuthenticate,
  } = useMutation(AuthServices.isAuthenticated);

  const onSubmit = async (data) => {
    let res = await registerUser(data);
    if (res.errors.alreadyRegistered && res.errors.msgError) {
      setAlreadyRegistered(true);
      return;
    }

    await login(data);

    const { user, isAuthenticated } = await authenticate();

    setUser(user);
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <ConditionalSimpleBar>
      <motion.div
        className={`register ${theme}`}
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

        <SnackBar
          open={alreadyRegistered}
          setOpen={setAlreadyRegistered}
          severity="error"
        >
          Bu email için zaten hesap var.
        </SnackBar>
        <div className="banner">
          {isImgLoaded ? (
            <motion.img
              initial={{ x: "-20%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-20%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
              }}
              src={RegistreImg}
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
                {" "}
                <SplitText
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  variants={splitText}
                >
                  Hesap Oluştur
                </SplitText>
              </h1>
              <p>
                Ücretsiz bir hesap açarak "CONSOLE"un birçok özelliğine
                ulaşabilirsin.
              </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RegisterFormInput
                name="userName"
                register={register}
                errors={errors}
                theme={theme}
                leftIcon={<Face />}
                autoComplete="off"
                visible={visible}
                setVisible={setVisible}
                alreadyRegistered={alreadyRegistered}
              />
              <RegisterFormInput
                name="email"
                register={register}
                errors={errors}
                theme={theme}
                leftIcon={<AlternateEmail />}
                autoComplete="off"
                visible={visible}
                setVisible={setVisible}
                alreadyRegistered={alreadyRegistered}
              />
              <RegisterFormInput
                name="password"
                register={register}
                errors={errors}
                theme={theme}
                leftIcon={<LockOutlined />}
                autoComplete="off"
                visible={visible}
                setVisible={setVisible}
                alreadyRegistered={alreadyRegistered}
              />
              <RegisterFormInput
                name="confirmPassword"
                register={register}
                errors={errors}
                theme={theme}
                leftIcon={<ConfirmationNumberOutlined />}
                autoComplete="off"
                visible={visible}
                setVisible={setVisible}
                alreadyRegistered={alreadyRegistered}
              />

              <Button type="submit">
                {isLoadingLogin ||
                isLoadingAuthenticate ||
                isLoadingRegister ? (
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
                  "Hesap Oluştur"
                )}
              </Button>
            </form>
            <footer>
              Zaten bir hesabın var mı? O zaman{" "}
              <Link to="/login" className="link">
                Giriş Yap
              </Link>
              .
            </footer>
          </main>
        </div>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Register;
