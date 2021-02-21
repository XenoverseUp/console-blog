const router = require("express").Router();
const passport = require("passport");

const Blog = require("../models/Blog");

// Get all unpublished Blogs

router.get(
  "/unconfirmed",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin" || req.user.role === "super-admin") {
      Blog.find({ isPublished: false })
        .populate("author", "userName")
        .sort({ createdAt: -1 })
        .exec((err, blogs) => {
          if (err)
            return res.status(500).json({
              errors: {
                internalError: "Ooops! Something has happened...",
                msgError: true,
              },
            });

          if (!blogs)
            return res.status(200).json({
              message: "No pending blogs has been found.",
              errors: { msgError: false },
            });

          return res.status(200).json({ blogs, errors: { msgError: false } });
        });
    }
  }
);

// Get single unpublished Blogs

router.get(
  "/blogs/:blogID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin" || req.user.role === "super-admin")
      Blog.findOne({
        _id: req.params.blogID,
        isPublished: false,
      })
        .populate("author", "userName")
        .exec((err, blog) => {
          if (err)
            return res.status(500).json({
              errors: {
                internalError: "Ooops! Something has happened...",
                msgError: true,
              },
            });

          if (!blog)
            return res.status(200).json({
              message: "The blog cannot be found.",
              errors: { msgError: false },
            });

          return res.status(200).json({ blog, errors: { msgError: false } });
        });
  }
);

// Confirm Blog

router.put(
  "/:blogID/confirmBlog",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin" || req.user.role === "super-admin") {
      Blog.findOneAndUpdate(
        { _id: req.params.blogID },
        { isPublished: true }
      ).exec((err) => {
        if (err)
          return res.status(500).json({
            errors: {
              internalError: "Ooops! Something has happened...",
              msgError: true,
            },
          });

        return res.status(200).json({
          message: "The blog has been published.",
          errors: {
            msgError: false,
          },
        });
      });
    }
  }
);

// Delete Blog

router.delete(
  "/:blogID/deleteBlog",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin" || req.user.role === "super-admin") {
      Blog.findOneAndRemove({ _id: req.params.blogID }, (err, blog) => {
        if (err)
          return res.status(500).json({
            errors: {
              internalError: "Ooops! Something has happened...",
              msgError: true,
            },
          });

        Comment.deleteMany({ _id: blog.comments }, (err) => {
          if (err)
            return res.status(500).json({
              errors: {
                internalError: "Ooops! Something has happened...",
                msgError: true,
              },
            });

          return res.status(200).json({
            messsage: "Blog has been deleted.",
            errors: { msgError: false },
          });
        });
      });
    }
  }
);

module.exports = router;
