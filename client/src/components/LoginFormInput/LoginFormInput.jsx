import React, { useRef, useEffect } from "react";
import { Error, Visibility, VisibilityOff } from "@material-ui/icons";
import { mergeRefs } from "../../hooks";

import "../RegisterFormInput/FormInput.scss";

const isEmpty = require("is-empty");

const LoginFormInput = ({
  leftIcon,
  errors,
  name,
  register,
  theme,
  visible,
  setVisible,
  cannotFound = false,
  promoteCard,
  made,
  ...rest
}) => {
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {}, [theme]); // Labels

  return (
    <div className={`form-input ${theme}`}>
      <div
        className={`input  ${
          errors[`${name}`] || cannotFound
            ? "errorForm"
            : isEmpty(errors)
            ? null
            : isEmpty(errors[`${name}`])
            ? "successForm"
            : null
        }`}
      >
        <span className="left-icon"> {leftIcon}</span>

        <input
          id={name}
          type={
            name === "email"
              ? "text"
              : name === "password" && !visible
              ? "password"
              : "text"
          }
          ref={mergeRefs(register, inputRef)}
          name={name}
          onBlur={(e) => {
            if (
              e.target.value.replace(/\s+/g, "") !== "" &&
              theme === "light"
            ) {
              labelRef.current.style.transform =
                "scale(0.8) translate(-2rem, -1.87rem)";
              labelRef.current.style.opacity = "1";
              labelRef.current.style.background =
                "linear-gradient(0deg, white 50%, #f9f9f9 50%)";
              labelRef.current.style.boxSizing = "content-box";
              labelRef.current.style.padding = "0 0.7rem";
              labelRef.current.style.fontWeight = "600";
            } else if (
              e.target.value.replace(/\s+/g, "") !== "" &&
              theme === "dark"
            ) {
              labelRef.current.style.transform =
                "scale(0.8) translate(-2rem, -1.87rem)";
              labelRef.current.style.opacity = "1";
              labelRef.current.style.background =
                "linear-gradient(0deg, #353535 50%, #252525 50%)";
              labelRef.current.style.boxSizing = "content-box";
              labelRef.current.style.padding = "0 0.7rem";
              labelRef.current.style.fontWeight = "600";
              labelRef.current.style.borderRadius = "9999px";
            }
          }}
          {...rest}
        />
        <label htmlFor={name} ref={labelRef}>
          {name === "password" ? "Şifre" : name === "email" ? "E-Mail" : null}
        </label>
        {name === "password" ? (
          visible ? (
            <div
              className="toggle"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              <Visibility
                style={
                  theme === "dark" ? { fill: "#f9f9f9" } : { fill: "#252525" }
                }
              />
            </div>
          ) : (
            <div
              className="toggle"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              <VisibilityOff
                style={
                  theme === "dark" ? { fill: "#f9f9f9" } : { fill: "#252525" }
                }
              />
            </div>
          )
        ) : null}
      </div>

      {!isEmpty(errors[`${name}`]) && errors[`${name}`].type !== "required" ? (
        <p className="error">
          <Error style={{ color: "rgb(145, 0, 0)" }} />
          {errors[`${name}`]?.message}
        </p>
      ) : null}
    </div>
  );
};

//
export default LoginFormInput;
