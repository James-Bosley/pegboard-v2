require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("./passport-config");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "./client/build"))); // Serves static assests on first request.
app.use(morgan(process.env.NODE_ENV === "production" ? "common" : "dev")); // Logs HTTP responses to the console. Type is based on environment.
app.use(bodyParser.json()); // Parses request body into req.body.[...]
app.use(cookieParser()); // Parses cookie data.

// Initializes sessions. MemoryStore should not be used for a deployed application.
const store =
  process.env.NODE_ENV === "production" ? null : new session.MemoryStore();
app.use(
  session({
    secret: process.env.PASS_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// Initializes passport authentication using sessions.
app.use(passport.initialize());
app.use(passport.session());

// All routes are nested into /v1 path for backend API. Allows a v2 to be built without interrupting service.
const masterRouter = require("./routes/masterRouter");
app.use("/v1", masterRouter);

// Responds to unrecognised paths with the static application index.
app.get("/*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
  }
  res.sendStatus(404);
});

// Listening for requests.
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
