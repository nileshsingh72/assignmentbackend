require("dotenv").config();
const express = require("express");
const { Notemodel } = require("../Model/notes.model");
const notesRouter = express.Router();

// const bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");

notesRouter.get("/", async (req, res) => {
  const allnotes = await Notemodel.find();
  res.send(allnotes);
});

notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  await Notemodel.create(payload);
  res.send({ res: "success" });
});

notesRouter.patch("/update/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  const payload = req.body;
  const note = await Notemodel.findOne({ _id: noteID });
  const userID = req.body.userID;

  if (userID !== note.userID) {
    res.send({ res: "not authorized" });
  } else {
    await Notemodel.findByIdAndUpdate({ _id: noteID }, payload);
    res.send({ res: "updated successfully" });
  }
});

notesRouter.delete("/delete/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  const note = await Notemodel.findOne({ _id: noteID });
  const userID = req.body.userID;
  console.log(userID, "here is userID");
  console.log(note, "here is note");
  if (userID !== note.userID) {
    res.send({ res: "not authorized" });
  } else {
    await Notemodel.findByIdAndDelete({ _id: noteID });
    res.send({ res: "deleted successfully" });
  }
});

module.exports = { notesRouter };
