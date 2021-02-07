const router = require("express").Router();
const passport = require("passport");
const validateAdminInput = require("../validation/validateAdminInput");

const User = require("../models/User");

// Promote

router.post(
  "/promote/:role",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "super-admin") {
      const { email } = req.body;
      let { role } = req.params;
      role.toString();
      let { errors, isValid } = validateAdminInput(req.body);

      if (!isValid) return res.status(400).json({ errors, isValid });

      User.findOneAndUpdate({ email }, { role }, { new: true }).exec(
        (err, user) => {
          if (err)
            return res.status(500).json({
              errors: {
                internalError: "Ooops! Something has happened...",
                msgError: true,
              },
            });

          if (!user) {
            errors.usernotfound = "Email is not registered.";
            errors.msgError = true;
            return res.status(400).json({ errors });
          }

          return res.status(200).json({
            message: `${user.email} is now a ${role}.`,
            errors: { msgError: false },
            user,
          });
        }
      );
    }
  }
);

module.exports = router;
