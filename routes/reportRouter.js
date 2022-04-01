const express = require("express");
const db = require("../db/db-query-report");
const { ensureLoggedIn, checkReportAccess } = require("../util/authCheck");

// Handles requests for reports based on path. Authorization is checked for each request.
const reportRouter = express.Router();

reportRouter.get(
  "/individual",
  ensureLoggedIn,
  checkReportAccess,
  async (req, res) => {
    const data = await db.individualReport(req.user.id);
    if (typeof data === "string") {
      return res.download(data);
    }
    res.sendStatus(500);
  }
);

reportRouter.get(
  "/session",
  ensureLoggedIn,
  checkReportAccess,
  async (req, res) => {
    const data = await db.sessionReport(req.query.id);
    if (typeof data === "string") {
      return res.download(data);
    }
    res.sendStatus(500);
  }
);

reportRouter.get(
  "/venue",
  ensureLoggedIn,
  checkReportAccess,
  async (req, res) => {
    const data = await db.venueReport(req.query.id);
    if (typeof data === "string") {
      return res.download(data);
    }
    res.sendStatus(500);
  }
);

module.exports = reportRouter;
