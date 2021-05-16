const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: [String],
    profile: { type: String },
  })
);

module.exports = User;
