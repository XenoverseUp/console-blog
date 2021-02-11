import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import SuperAdminServices from "../../services/SuperAdminServices";
import {
  SnackBar,
  SplitText,
  Button,
  ConditionalSimpleBar,
} from "../../components";
import {
  AlternateEmail,
  Book,
  BusinessCenter,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowLeft,
} from "@material-ui/icons";
import { LoginFormInput, StyledMenuItem, StyledSelect } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { promoteValidationSchema } from "../../validation";
import isEmpty from "is-empty";
import { motion } from "framer-motion";
import fromRight from "../../animations/fromRight";
import tapping from "../../animations/tapping";
import PromoteImg from "../../assets/img/promotePage.png";

import "./Promote.scss";
import { useHistory, useLocation } from "react-router-dom";

const Promote = () => {
  const { theme } = useContext(ThemeContext);

  const history = useHistory();
  const location = useLocation();

  const { register, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(promoteValidationSchema),
    mode: "onSubmit",
  });

  const [role, setRole] = useState("reader");
  const [updatedRole, setUpdatedRole] = useState("");
  const [cannotFound, setCannotFound] = useState(false);
  const [made, setMade] = useState(false);
  const [userName, setUserName] = useState("");

  const onSubmit = async (data) => {
    const {
      errors: { msgError },
      user,
    } = await SuperAdminServices.promote(role, data);

    if (msgError && isEmpty(user)) return setCannotFound(true);

    setCannotFound(false);
    setMade(true);
    setUserName(user.userName);
    setUpdatedRole(
      user.role === "reader"
        ? "okuyucu"
        : user.role === "editor"
        ? "editör"
        : "yönetici"
    );
    reset();
  };

  return (
    <ConditionalSimpleBar>
      <motion.div
        variants={fromRight}
        initial="initial"
        animate="visible"
        exit="exit"
        onAnimationStart={() => (document.body.style.overflow = "hidden")}
        onAnimationComplete={() => (document.body.style.overflow = "auto")}
      >
        <div className={`promote ${theme}`}>
          <SnackBar open={made} setOpen={setMade} severity="success">
            {`${userName} şu anda bir ${updatedRole}.`}
          </SnackBar>
          <motion.div
            onClick={() =>
              history.push({
                pathname: "/admin",
                state: { from: location.pathname },
              })
            }
            whileTap={tapping}
            style={{ cursor: "pointer" }}
            className="back"
          >
            <KeyboardArrowLeft /> <p>Ana sayfa</p>
          </motion.div>

          <div className="banner">
            <img src={PromoteImg} alt="Console" />
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
                    Rolleri Düzenle
                  </SplitText>
                </h1>
                <p>
                  Buradan kullanıcıların e-mail adresini girerek rollerini
                  değiştirebilirsin.
                </p>
              </header>
              <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                  <LoginFormInput
                    name="email"
                    register={register}
                    errors={errors}
                    theme={theme}
                    leftIcon={<AlternateEmail />}
                    autoComplete="off"
                    cannotFound={cannotFound}
                    promoteCard
                  />
                  <StyledSelect
                    value={role}
                    onChange={({ target: { value } }) => setRole(value)}
                    variant="outlined"
                    IconComponent={KeyboardArrowDown}
                  >
                    <StyledMenuItem value="reader">
                      <Book /> <p>Okuyucu</p>
                    </StyledMenuItem>
                    <StyledMenuItem value="editor">
                      <Edit /> <p>Editör</p>
                    </StyledMenuItem>
                    <StyledMenuItem value="admin">
                      <BusinessCenter /> <p>Yönetici</p>
                    </StyledMenuItem>
                  </StyledSelect>
                </section>
                <Button type="submit">Düzenle</Button>
              </form>
            </main>
          </div>
        </div>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default Promote;
