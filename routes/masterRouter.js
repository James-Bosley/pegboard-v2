const express = require("express");

const masterRouter = express.Router();

app.get("/", async (req, res) => {
  res.json({ message: "Server is working." });
});

const userRouter = require("./userRouter");
app.use("/user", userRouter);

module.exports = masterRouter;
