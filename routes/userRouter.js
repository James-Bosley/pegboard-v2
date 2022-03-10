const express = require("express");
const passport = require("../passport-config");

const userRouter = express.Router();

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = userRouter;
