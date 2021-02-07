const router = require("express").Router();
const passport = require("passport");
const { signToken } = require("../utils/signToken");
const validateRegisterInput = require("../validation/validateRegisterInput");

const User = require("../models/User");

router.post("/register", (req, res) => {
  const { userName, email, password } = req.body;

  let { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json({ errors, isValid });

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.alreadyRegistered = "This email has already registered.";
        errors.msgError = true;

        return res.status(400).json({ errors });
      }

      const newUser = new User({
        userName,
        email,
        password,
      });

      newUser.save((err) => {
        if (err) {
          errors.internalError = "Ooops! Something has happened...";
          errors.message = err.message;
          errors.msgError = true;

          return res.status(500).json({ errors });
        }

        res.status(200).json({
          message: "Account has been created.",
          errors: { msgError: false },
        });
      });
    })
    .catch((err) => {
      errors.internalError = "Ooops! Something has happened...";
      errors.message = err.message;
      errors.msgError = true;

      return res.status(500).json({ errors });
    });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, userName, email, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { userName, email, role } });
    } else {
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({
      success: true,
      user: {
        userName: "",
        email: "",
        role: "",
      },
    });
  }
);

router.get(
  "/isAuthenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { userName, email, role } = req.user;
    res
      .status(200)
      .json({ isAuthenticated: true, user: { userName, email, role } });
  }
);

module.exports = router;
