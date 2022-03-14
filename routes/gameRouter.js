const express = require("express");
const db = require("../db/db-query-game");

const gameRouter = express.Router();

gameRouter.post("/", async (req, res) => {
  const newGame = await db.addGame(req.body);
  if (newGame !== 500) {
    res.status(201).json(newGame);
  } else {
    res.sendStatus(500);
  }
});

module.exports = gameRouter;
