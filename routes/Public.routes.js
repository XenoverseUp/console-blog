const router = require("express").Router();
const passport = require("passport");
const {
  Types: { ObjectId },
} = require("mongoose");
const validateCommentInput = require("../validation/validateCommentInput");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");

// Get paginated blogs with page, limit and category parameters.

router.get(
  "/blogs",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  (req, res) => {
    let { page, limit = 6, category } = req.query;
    category = category || "all";

    const options = {
      page,
      limit,
      allowDiskUse: true,
    };

    const pipeline = [
      {
        $match: { isPublished: true, ...(category !== "all" && { category }) },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          title: 1,
          subtitle: 1,
          category: 1,
          coverImagePath: 1,
          createdAt: 1,
          likes: 1,
          views: 1,
          isLiked: {
            $in: ["$_id", { $ifNull: [req.user?.likedBlogs, []] }],
          },
          isBookmarked: {
            $in: ["$_id", { $ifNull: [req.user?.bookmarkedBlogs, []] }],
          },
          authorId: {
            $toObjectId: "$author",
          },
        },
      },
      {
        $lookup: {
          localField: "authorId",
          from: "users",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          authorId: 0,
          author: {
            _id: 0,
            email: 0,
            password: 0,
            createdAt: 0,
            role: 0,
            bookmarkedBlogs: 0,
            likedBlogs: 0,
            __v: 0,
          },
        },
      },
    ];

    const aggregate = Blog.aggregate(pipeline);
    Blog.aggregatePaginate(aggregate, options)
      .then((docs) => {
        res.status(200).send(docs);
      })
      .catch((err) =>
        res.status(500).send({ err, msg: "Oopps, something happened!" })
      );
  }
);

// Get top 3 blogs.

router.get(
  "/blogs/top",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  (req, res) => {
    Blog.aggregate([
      {
        $match: { isPublished: true },
      },
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          title: 1,
          subtitle: 1,
          category: 1,
          coverImagePath: 1,
          createdAt: 1,
          likes: 1,
          views: 1,
          isLiked: {
            $in: ["$_id", { $ifNull: [req.user?.likedBlogs, []] }],
          },
          isBookmarked: {
            $in: ["$_id", { $ifNull: [req.user?.bookmarkedBlogs, []] }],
          },
          authorId: {
            $toObjectId: "$author",
          },
        },
      },
      {
        $lookup: {
          localField: "authorId",
          from: "users",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          authorId: 0,
          author: {
            _id: 0,
            email: 0,
            password: 0,
            createdAt: 0,
            role: 0,
            bookmarkedBlogs: 0,
            likedBlogs: 0,
            __v: 0,
          },
        },
      },
    ])

      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(500).send(err));
  }
);

// Get a single Blog

router.get(
  "/blog",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  (req, res) => {
    Blog.aggregate([
      {
        $match: {
          _id: ObjectId(req.query.id),
          isPublished: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          subtitle: 1,
          category: 1,
          coverImagePath: 1,
          createdAt: 1,
          likes: 1,
          views: 1,
          content: 1,
          comments: 1,
          isLiked: {
            $in: ["$_id", { $ifNull: [req.user?.likedBlogs, []] }],
          },
          isBookmarked: {
            $in: ["$_id", { $ifNull: [req.user?.bookmarkedBlogs, []] }],
          },
          authorId: {
            $toObjectId: "$author",
          },
        },
      },
      {
        $lookup: {
          localField: "authorId",
          from: "users",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          authorId: 0,
          author: {
            _id: 0,
            email: 0,
            password: 0,
            createdAt: 0,
            role: 0,
            bookmarkedBlogs: 0,
            likedBlogs: 0,
            __v: 0,
          },
        },
      },
    ])
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(500).send(err));
  }
);

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

router.patch(
  "/blog/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.likedBlogs.push(req.query.id);
    req.user.save((err) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });
      Blog.findOneAndUpdate(
        { _id: req.query.id },
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

router.patch(
  "/blog/dislike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.likedBlogs.remove(req.query.id);
    req.user.save((err) => {
      if (err)
        return res.status(500).json({
          errors: {
            internalError: "Ooops! Something has happened...",
            msgError: true,
          },
        });

      Blog.findOneAndUpdate(
        { _id: req.query.id },
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

router.patch(
  "/blog/bookmark",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.user.bookmarkedBlogs.push(req.query.id);
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

router.patch(
  "/blog/unbookmark",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { bookmarkedBlogs: req.query.id } }
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

router.patch("/blog/views", (req, res) => {
  Blog.findOneAndUpdate(
    { _id: req.query.id },
    { $inc: { views: 1 } },
    { new: true },
    (err) => {
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
