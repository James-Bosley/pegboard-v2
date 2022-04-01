const ensureLogIn = require("connect-ensure-login").ensureLoggedIn;

// Collection of middleware to validate authentication or authorization.

// Checks for active session.
const ensureLoggedIn = ensureLogIn("/v1/error");

// Checks for correct authorization level to alter session status.
const checkSessionRep = (req, res, next) => {
  if (req.user.access_level === "session_rep") {
    return next();
  }
  res.status(404).send("Unauthorized");
};

// Checks users report access level before render.
const checkReportAccess = (req, res, next) => {
  const options = {
    "/individual": ["user", "session_rep", "venue_admin"],
    "/session": ["session_rep", "venue_admin"],
    "/venue": ["venue_admin"],
  };
  if (options[req.path].includes(req.user.access_level)) {
    return next();
  }
  res.status(404).send("Unauthorized");
};

module.exports = { ensureLoggedIn, checkSessionRep, checkReportAccess };
