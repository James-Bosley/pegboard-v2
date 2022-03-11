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

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

const store = new session.MemoryStore();
app.use(
  session({
    secret: process.env.PASS_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const masterRouter = require("./routes/masterRouter");
app.use("/v1", masterRouter);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
