const express = require("express");
const passport = require("../passport-config");
const db = require("../db/db-query-user");
const ensureLoggedIn = require("../util/authCheck").ensureLoggedIn;

const userRouter = express.Router();

// Handles login requests. Success attaches user to req.user and starts a session.
userRouter.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  async (req, res) => {
    // Retrieves and sends constructed representation of the user and their permissions.
    const data = await db.userData(req.user.id);
    if (data) {
      return res.json(data);
    }
    res.sendStatus(500);
  }
);

userRouter.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

// Handles new user requests.
userRouter.post("/register", async (req, res) => {
  const data = await db.registerUser(req.body);
  if (data) {
    return res.sendStatus(201);
  }
  res.sendStatus(500);
});

// Handles client side checks to ensure the session has not expired.
userRouter.get("/checksession", ensureLoggedIn, async (req, res) => {
  const data = await db.userData(req.user.id);
  if (data) {
    return res.json(data);
  }
  res.sendStatus(500);
});

// Handles updates to the player profile owned by the logged in user.
userRouter.put("/player", ensureLoggedIn, async (req, res) => {
  const data = await db.updatePlayer(req.body);
  if (data) {
    return res.json(data);
  }
  res.sendStatus(500);
});

// Submits session access request.
userRouter.post("/accessRequest", ensureLoggedIn, async (req, res) => {
  const data = await db.addAccessRequest(req.user.id, req.body);
  if (data) {
    return res.sendStatus(201);
  }
  res.sendStatus(500);
});

module.exports = userRouter;
