const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = ({ content }) => {
  let errors = {};

  content = isEmpty(content) ? "" : content;

  if (Validator.isEmpty(content)) {
    errors.content = "Content field is required.";
    errors.msgError = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
