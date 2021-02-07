const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new model("Comment", CommentSchema);
