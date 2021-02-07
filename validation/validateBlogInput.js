const isEmpty = require("is-empty");
const Validator = require("validator");

module.exports = ({ title, subtitle, category, readingDuration, content }) => {
  let errors = {};

  readingDuration = parseInt(readingDuration);

  title = isEmpty(title) ? "" : title;
  subtitle = isEmpty(subtitle) ? "" : subtitle;
  category = isEmpty(category) ? "" : category;
  content = isEmpty(content) ? "" : content;

  if (Validator.isEmpty(title)) {
    errors.title = "Title field is required.";
    errors.msgError = true;
  }

  if (Validator.isEmpty(category)) {
    errors.category = "Category field is required.";
    errors.msgError = true;
  }

  if (Validator.isEmpty(subtitle)) {
    errors.subtitle = "Subtitle field is required.";
    errors.msgError = true;
  }

  if (Validator.isEmpty(content)) {
    errors.content = "Content field is required.";
    errors.msgError = true;
  } else if (!Validator.isLength(content, { min: 200 })) {
    errors.content = "Content must be at least 200 characters.";
    errors.msgError = true;
  }

  if (readingDuration === 0) {
    errors.readingDuration = "Reading duration cannot be 0 minutes.";
    errors.category = true;
  } else if (readingDuration === null) {
    errors.readingDuration = "Reading duration field is required.";
    errors.category = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
