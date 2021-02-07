const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = ({ userName, email, password, confirmPassword }) => {
  let errors = {};

  userName = isEmpty(userName) ? "" : userName;
  email = isEmpty(email) ? "" : email;
  password = isEmpty(password) ? "" : password;
  confirmPassword = isEmpty(confirmPassword) ? "" : confirmPassword;

  if (Validator.isEmpty(userName)) {
    errors.userName = "Name field is required.";
    errors.msgError = true;
  }

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required.";
    errors.msgError = true;
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is not valid.";
    errors.msgError = true;
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required.";
    errors.msgError = true;
  } else if (!Validator.isLength(password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters.";
    errors.msgError = true;
  }

  if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required.";
    errors.msgError = true;
  } else if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match.";
    errors.msgError = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
