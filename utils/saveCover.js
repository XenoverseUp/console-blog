const imageMimeTypes = require("../config/imageMimeTypes");

const saveCover = (blog, coverEncoded, res) => {
  if (coverEncoded == null)
    return res
      .status(400)
      .json({
        errors: {
          coverImage: "Cover image field is required.",
          msgError: true,
        },
      });

  const cover = JSON.parse(coverEncoded);

  if (cover !== null && imageMimeTypes.includes(cover.type)) {
    blog.coverImage = new Buffer.from(cover.data, "base64");
    blog.coverImageType = cover.type;
  }
};

module.exports = saveCover;
