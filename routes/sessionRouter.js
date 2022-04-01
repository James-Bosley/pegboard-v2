const express = require("express");
const db = require("../db/db-query-session");
const ensureLoggedIn = require("../util/authCheck").ensureLoggedIn;
const checkSessionRep = require("../util/authCheck").checkSessionRep;

const sessionRouter = express.Router();

// Changes session state.
sessionRouter.put(
  "/activate/:id",
  ensureLoggedIn,
  checkSessionRep,
  async (req, res) => {
    const data = await db.setActiveSessionStatus(req.params.id, req.body);
    if (data) {
      return res.json(data);
    }
    res.sendStatus(500);
  }
);

module.exports = sessionRouter;
