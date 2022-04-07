const express = require("express");

// Handles traffic to named sub routes for specified purposes.
const masterRouter = express.Router();

// Used in development to check server is recieving client requests.
masterRouter.get("/", async (req, res) => {
  res.json({ message: "~~Server is working~~" });
});

const userRouter = require("./userRouter");
masterRouter.use("/user", userRouter);

const sessionRouter = require("./sessionRouter");
masterRouter.use("/session", sessionRouter);

const gameRouter = require("./gameRouter");
masterRouter.use("/game", gameRouter);

const reportRouter = require("./reportRouter");
masterRouter.use("/report", reportRouter);

// Authentication failures are handled here.
masterRouter.get("/error", (req, res) => {
  res.sendStatus(401);
});

module.exports = masterRouter;
