const router = require("express").Router();
const passport = require("passport");
const multiparty = require("connect-multiparty");
const { join, extname } = require("path");
const { rename } = require("fs");
const validateBlogInput = require("../validation/validateBlogInput");

const multiPartyMiddleWare = multiparty({ uploadDir: "./temp/cover" });
const Blog = require("../models/Blog");

// Send Blog to confirmation

router.post(
  "/addblog",
  passport.authenticate("jwt", { session: false }),
  multiPartyMiddleWare,
  (req, res) => {
    if (
      req.user.role === "editor" ||
      req.user.role === "admin" ||
      req.user.role === "super-admin"
    ) {
      let tempFile = req.files.coverImage;
      let tempPathFile = tempFile.path;
      const targetPathUrl = join(
        __dirname,
        "../uploads/cover/" + tempPathFile.split("\\")[2]
      );

      let { title, content, category, subtitle } = req.body;
      let { errors, isValid } = validateBlogInput(req.body);
      if (!isValid) return res.status(400).json({ errors, isValid });

      let newBlog = new Blog({
        title,
        subtitle,
        content,
        category,
      });
      newBlog.author = req.user._id;

      if (
        [".png", ".jpg", ".jpeg", ".webp"].includes(
          extname(tempFile.originalFilename).toLowerCase()
        )
      ) {
        rename(tempPathFile, targetPathUrl, (err) => {
          if (err) {
            return res.status(500).json({
              errors: {
                internalError: "Ooops! Something has happened...",
                msgError: true,
              },
            });
          }

          newBlog.coverImagePath = `/${tempPathFile.split("\\")[2]}`;

          newBlog.save((err, blog) => {
            if (err)
              return res.status(500).json({
                errors: {
                  internalError: "Ooops! Something has happened...",
                  msgError: true,
                },
              });

            return res.status(200).json({
              blogCreated: `${blog.title} has been published successfully.`,
              errors: {
                msgError: false,
              },
            });
          });
        });
      }
    }
  }
);

router.get(
  "/stats",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (["editor", "admin", "super-admin"].includes(req.user.role)) {
      Blog.aggregate([
        {
          $match: { author: req.user._id },
        },
        {
          $project: {
            isPublished: 1,
            likes: { $size: "$likedBy" },
            views: 1,
          },
        },
      ])
        .then((docs) => {
          const stats = {
            views: 0,
            likes: 0,
            blogs: docs.length,
            pendingBlogs: 0,
            topBlog: {
              _id: "",
            },
          };

          let tempViews = 0;

          for (let i = 0; i < stats.blogs; i++) {
            stats.views += docs[i].views;
            stats.likes += docs[i].likes;

            if (!docs[i].isPublished) stats.pendingBlogs++;
            if (docs[i].views >= tempViews) {
              stats.topBlog._id = docs[i]._id;
              tempViews = docs[i].views;
            }
          }

          Blog.aggregate([
            {
              $match: {
                _id: stats.topBlog._id,
              },
            },
            {
              $project: {
                title: 1,
                subtitle: 1,
                views: 1,
                coverImagePath: 1,
                likes: {
                  $size: "$likedBy",
                },
                comments: {
                  $size: "$comments",
                },
              },
            },
          ])
            .then((doc) => {
              stats.topBlog = doc[0];
              res.status(200).send(stats);
            })
            .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
    } else {
      res.sendStatus(401);
    }
  }
);

module.exports = router;
