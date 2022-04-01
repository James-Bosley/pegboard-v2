const express = require("express");
const db = require("../db/db-query-game");

const gameRouter = express.Router();

// Adds game to database.
gameRouter.post("/", async (req, res) => {
  const data = await db.addGame(req.body);
  if (data) {
    return res.json(data);
  }
  res.sendStatus(500);
});

module.exports = gameRouter;
