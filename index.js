require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./Config/db");
const { userRouter } = require("./Route/user.route");
const { notesRouter } = require("./Route/notes.route");
const { authenticate } = require("./Middleware/authenticate");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(authenticate);
app.use("/notes", notesRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log("db connection established");
  } catch (err) {
    console.log("db not connected");
  }
  console.log(`http://localhost:${process.env.PORT}`);
});
