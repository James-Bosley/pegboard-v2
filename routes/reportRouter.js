const express = require("express");
const individualReport = require("../reports/individualReport");
const sessionReport = require("../reports/sessionReport");
const venueReport = require("../reports/venueReport");
const { ensureLoggedIn, checkReportAccess } = require("../util/authCheck");

// Handles requests for reports based on path. Authorization is checked for each request.
const reportRouter = express.Router();

reportRouter.get(
  "/individual",
  ensureLoggedIn,
  checkReportAccess,
  async (req, res) => {
    const data = await individualReport(req.user.id);
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
    const data = await sessionReport(req.user.id, req.query.id);
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
    const data = await venueReport(req.user.id, req.query.id);
    if (typeof data === "string") {
      return res.download(data);
    }
    res.sendStatus(500);
  }
);

module.exports = reportRouter;
