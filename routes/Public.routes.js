const router = require("express").Router();
const passport = require("passport");
const validateCommentInput = require("../validation/validateCommentInput");

const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");

// Get all blogs with limit parameter

router.get("/:number", (req, res) => {
  const param = parseInt(req.params.number);

  Blog.find({ isPublished: true })
    .populate("author", "name")
    .populate("comments.postedBy")
    .sort({ createdAt: -1 })
    .limit(param)
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
});

// Get a category with limit parameter

router.get("/:number/:category", (req, res) => {
  const param = parseInt(req.params.number);

  Blog.find({ isPublished: true, category: req.params.category })
    .populate("author", "name")
    .populate("comments.postedBy")
    .sort({ createdAt: -1 })
    .limit(param)
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
});

// Get a single Blog

router.get("/blogs/:blogID", (req, res) => {
  Blog.findOne({ _id: req.params.blogID, isPublished: true })
    .populate("author", "userName")
    .populate("comments.postedBy")
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
});

// Get bookmarked blogs

router.get(
  "/blogs/bookmarked",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    req.user.populate("bookmarkedBlogs").exec(err, (blogs) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });

      return res.status(200).json({ blogs, errors: { msgError: false } });
    });
  })
);

// Post a comment about blog

router.post(
  "/blogs/:blogID/addComment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { content } = req.body;
    let { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) return res.status(400).json(errors, isValid);

    let newComment = new Comment({ content });

    newComment.postedBy = req.user._id;
    newComment.save((err, comment) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });

      Blog.findOne({ _id: req.params.blogID }, (err, blog) => {
        if (err)
          return res.status(500).json({
            errors: {
              internalError: "Ooops! Something has happened...",
              msgError: true,
            },
          });

        blog.comments.push(comment._id);
        blog.save((err) => {
          if (err)
            return res.status(500).json({
              errors: {
                internalError: "Ooops! Something has happened...",
                msgError: true,
              },
            });
          else
            return res.status(200).json({
              message: "Comment has been posted.",
              errors: { msgError: false },
            });
        });
      });
    });
  }
);

// Like a Blog

router.put(
  "/blogs/:blogID/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.likedBlogs.push(req.params.blogID);
    req.user.save((err) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });
      Blog.findOneAndUpdate(
        { _id: req.params.blogID },
        { $inc: { likes: 1 } },
        { new: true }
      ).exec((err) => {
        if (err)
          return res.status(500).json({
            errors: {
              internalError: "Ooops! Something has happened...",
              msgError: true,
            },
          });
        else
          return res.status(200).json({
            message: "Like has been updated.",
            errors: { msgError: false },
          });
      });
    });
  }
);

// Dislike a blog

router.put(
  "/blogs/:blogID/dislike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.likedBlogs.remove(req.params.blogID);
    req.user.save((err) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });

      Blog.findOneAndUpdate(
        { _id: req.params.blogID },
        { $inc: { likes: -1 } },
        { new: true }
      ).exec((err) => {
        if (err)
          return res.status(500).json({
            errors: {
              internalError: "Ooops! Something has happened...",
              msgError: true,
            },
          });
        else
          return res.status(200).json({
            message: "Like has been updated.",
            errors: { msgError: false },
          });
      });
    });
  }
);

// Bookmark a Blog;

router.put(
  "/blogs/:blogID/bookmark",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.bookmarkedBlogs.push(req.params.blogID);
    req.user.save((err) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });

      return res.status(200).json({
        message: "Blog has been bookmarked.",
        errors: { msgError: false },
      });
    });
  }
);

// UnBookmark a Blog

router.delete(
  "/blogs/:blogID/unbookmark",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { bookmarkedBlogs: req.params.blogID } }
    ).exec((err) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
            err,
          },
        });

      return res.status(200).json({
        message: "Blog has been unbookmarked.",
        errors: { msgError: false },
      });
    });
  }
);

// Update Blog views

router.put("/blogs/:blogID/views", (req, res) => {
  Blog.findOneAndUpdate(
    { _id: req.params.blogID },
    { $inc: { views: 1 } },
    { new: true },
    (err, updatedBlog) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });

      return res.status(200).json({
        message: "Blog views has been updated.",
        errors: { msgError: false },
      });
    }
  );
});

module.exports = router;
