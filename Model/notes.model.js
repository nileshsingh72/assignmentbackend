const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  userID: String,
});

const Notemodel = mongoose.model("notes", noteSchema);
module.exports = { Notemodel };
