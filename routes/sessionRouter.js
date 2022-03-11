const express = require("express");
const passport = require("../passport-config");
const db = require("../db/db-query-session");
const ensureLogIn = require("connect-ensure-login").ensureLoggedIn;

const sessionRouter = express.Router();
const ensureLoggedIn = ensureLogIn("/v1/error");

const checkAuthLevel = (req, res, next) => {
  if (req.user.access_level === "session_rep") {
    return next();
  }
  res.status(404).send("Unauthorized");
};

sessionRouter.put(
  "/activate/:id",
  ensureLoggedIn,
  checkAuthLevel,
  async (req, res) => {
    const data = await db.setActiveSessionStatus(req.params.id, req.body);
    res.json(data);
  }
);

module.exports = sessionRouter;
