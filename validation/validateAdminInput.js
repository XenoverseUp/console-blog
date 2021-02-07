const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = ({ email }) => {
  let errors = {};

  email = isEmpty(email) ? "" : email;

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required.";
    errors.msgError = true;
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid.";
    errors.msgError = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
