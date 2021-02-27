const { Schema, model } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["reader", "editor", "admin", "super-admin"],
    default: "reader",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookmarkedBlogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt
    .compare(password, this.password)
    .then((isMatch) => {
      if (!isMatch) return callback(null, isMatch);
      return callback(null, this);
    })
    .catch((err) => callback(err));
};

UserSchema.plugin(aggregatePaginate);

module.exports = new model("User", UserSchema);
