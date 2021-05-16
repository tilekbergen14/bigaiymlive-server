const mongoose = require("mongoose");

const Image = mongoose.model(
  "image",
  mongoose.Schema({
    url: { type: String, required: true },
    likes: [String],
    categories: [String],
    photographer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);

module.exports = Image;
