const express = require("express");
const passport = require("../passport-config");
const db = require("../db/db-query-user");
const ensureLogIn = require("connect-ensure-login").ensureLoggedIn;

const userRouter = express.Router();
const ensureLoggedIn = ensureLogIn("/v1/error");

userRouter.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  async (req, res) => {
    const userData = await db.userData(req.user.id);
    res.json(userData);
  }
);

userRouter.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

userRouter.post("/register", async (req, res) => {
  const newUser = await db.registerUser(req.body);
  res.sendStatus(newUser);
});

userRouter.get("/checksession", ensureLoggedIn, async (req, res) => {
  const userData = await db.userData(req.user.id);
  res.json(userData);
});

module.exports = userRouter;
