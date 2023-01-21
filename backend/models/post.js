const mongoose = require("mongoose");

const postSchema = mongoose.Schema({   // Schema is a blueprint, need to use a model to do actual work
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Post", postSchema);
