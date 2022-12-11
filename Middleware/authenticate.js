var jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req, res, next) => {
  var token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.S_KEY, function (err, decoded) {
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.send("toekn wrong");
      }
    });
  } else {
    res.send({ res: "please login again !" });
  }
};

module.exports = { authenticate };
