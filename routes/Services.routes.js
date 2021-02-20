const router = require("express").Router();
const passport = require("passport");
const multiparty = require("connect-multiparty");
const { join, extname } = require("path");
const { rename } = require("fs");

const multiPartyMiddleWare = multiparty({ uploadDir: "./temp/blog" });

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  multiPartyMiddleWare,
  (req, res) => {
    if (
      req.user.role === "editor" ||
      req.user.role === "admin" ||
      req.user.role === "super-admin"
    ) {
      let TempFile = req.files.upload;
      let TempPathFile = TempFile.path;

      const targetPathUrl = join(
        __dirname,
        "../uploads/blog/" + TempPathFile.split("\\")[2]
      );

      if (
        [".png", ".jpg", ".jpeg", ".webp"].includes(
          extname(TempFile.originalFilename).toLowerCase()
        )
      ) {
        rename(TempPathFile, targetPathUrl, (err) => {
          res.status(200).json({
            uploaded: true,
            url: `/${TempPathFile.split("\\")[2]}`,
          });

          if (err) return console.log(err);
        });
      }
    }
  }
);

module.exports = router;
