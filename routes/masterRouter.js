const express = require("express");

const masterRouter = express.Router();

masterRouter.get("/", async (req, res) => {
  res.json({ message: "~~Server is working~~" });
});

const userRouter = require("./userRouter");
masterRouter.use("/user", userRouter);

const sessionRouter = require("./sessionRouter");
masterRouter.use("/session", sessionRouter);

masterRouter.get("/error", (req, res) => {
  res.sendStatus(401);
});

module.exports = masterRouter;
