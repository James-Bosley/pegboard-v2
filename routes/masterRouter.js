const express = require("express");

const masterRouter = express.Router();

masterRouter.get("/", async (req, res) => {
  res.json({ message: "Server is working." });
});

const userRouter = require("./userRouter");
masterRouter.use("/user", userRouter);

module.exports = masterRouter;
