require("dotenv").config();
const session = require("express-session");

session({
  secret: process.env.PASS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
});

module.exports = session;
