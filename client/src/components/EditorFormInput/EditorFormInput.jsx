import React, { useRef, useEffect } from "react";
import { Error } from "@material-ui/icons";
import { mergeRefs } from "../../hooks";
import "../RegisterFormInput/FormInput.scss";

const isEmpty = require("is-empty");

const EditorFormInput = ({
  leftIcon,
  errors,
  name,
  register,
  theme,
  defaultValue,
  ...rest
}) => {
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (labelRef && inputRef) {
      if (isEmpty(inputRef.current.value)) {
        labelRef.current.style.transform = "scale(1) translate(0,0)";
        labelRef.current.style.opacity = ".7";
        labelRef.current.style.background = "transparent";
        labelRef.current.style.boxSizing = "border-box";
        labelRef.current.style.padding = "0";
        labelRef.current.style.fontWeight = "400";
      } else if (inputRef.current.value.replace(/\s+/g, "") !== "") {
        labelRef.current.style.transform =
          "scale(0.8) translate(-2rem, -1.87rem)";
        labelRef.current.style.opacity = "1";
        labelRef.current.style.boxSizing = "content-box";
        labelRef.current.style.padding = "0 0.7rem";
        labelRef.current.style.fontWeight = "600";

        if (theme === "light") {
          labelRef.current.style.background =
            "linear-gradient(0deg, white 50%, #f9f9f9 50%)";
        }

        if (theme === "dark") {
          labelRef.current.style.background =
            "linear-gradient(0deg, #353535 50%, #252525 50%)";
        }
      }
    }
  }, [theme]); // Labels

  return (
    <div className={`form-input ${theme}`}>
      <div
        className={`input  ${
          errors[`${name}`]
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
          type="text"
          ref={mergeRefs(register, inputRef)}
          name={name}
          defaultValue={defaultValue}
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
          {name === "title" ? "Başlık" : "Alt Başlık"}
        </label>
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

export default EditorFormInput;
