const router = require("express").Router();
const passport = require("passport");
const saveCover = require("../utils/saveCover");
const validateBlogInput = require("../validation/validateBlogInput");

const Blog = require("../models/Blog");

// Send Blog to confirmation

router.post(
  "/addblog",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (
      req.user.role === "editor" ||
      req.user.role === "admin" ||
      req.user.role === "super-admin"
    ) {
      let {
        title,
        content,
        category,
        readingDuration,
        coverImage,
        subtitle,
      } = req.body;

      readingDuration = parseInt(readingDuration);

      let { errors, isValid } = validateBlogInput(req.body);
      if (!isValid) return res.status(400).json({ errors, isValid });

      let newBlog = new Blog({
        title,
        subtitle,
        content,
        category,
        readingDuration,
      });

      newBlog.author = req.user._id;

      saveCover(newBlog, coverImage, res);
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
    }
  }
);

// Editors all writings

router.get(
  "/myBlogs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (
      req.user.role === "editor" ||
      req.user.role === "admin" ||
      req.user.role === "super-admin"
    ) {
      Blog.find({ author: req.user._id })
        .populate("author", "name")
        .populate("comments.postedBy")
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
              message: "No blogs has been found.",
              errors: { msgError: false },
            });

          return res.status(200).json({ blogs, errors: { msgError: false } });
        });
    }
  }
);

// Editors unpublished writings

router.get("/blogs/:blogID", (req, res) => {
  if (
    req.user.role === "editor" ||
    req.user.role === "admin" ||
    req.user.role === "super-admin"
  ) {
    Blog.findOne({
      _id: req.params.blogID,
      isPublished: false,
      author: req.user._id,
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
});

module.exports = router;
