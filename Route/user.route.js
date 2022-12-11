require("dotenv").config();
const express = require("express");
const { Usermodel } = require("../Model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  const allusers = await Usermodel.find();
  res.send(allusers);
});

userRouter.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const isPresent = await Usermodel.find({ email });
  if (isPresent.length > 0) {
    res.send({ res: "User already exists" });
  } else {
    try {
      bcrypt.hash(password, 8, async (err, hash) => {
        const newuser = new Usermodel({
          email: email,
          password: hash,
          name: name,
        });
        await newuser.save();
      });
      res.send({ res: "user created" });
    } catch (err) {
      res.send({ res: err.message });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isPresent = await Usermodel.findOne({ email });
  if (isPresent) {
    const id = isPresent._id;
    const hasepassword = isPresent.password;
    bcrypt.compare(password, hasepassword, function (err, result) {
      if (result == true) {
        const token = jwt.sign({ userID: id }, process.env.S_KEY, {
          expiresIn: "1h",
        });
        res.send({ res: "login success", token: token });
      }
    });
  } else {
    res.send({ res: "please try again!" });
  }
});

module.exports = { userRouter };
