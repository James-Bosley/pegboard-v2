const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("./session-config");
const passport = require("./passport-config");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

const masterRouter = require("./routes/masterRouter");
app.use("/v1", masterRouter);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
