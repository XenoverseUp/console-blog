const JWT = require("jsonwebtoken");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "xenoverseup",
      sub: userID,
    },
    process.env.SECRET_OR_KEY,
    { expiresIn: "90d" }
  );
};

module.exports = {
  signToken,
};
