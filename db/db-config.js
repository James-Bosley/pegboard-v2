require("dotenv").config();

// Returns database access configs based on environment - defaults to development if none is detected.
const knex = require("knex");
const dbEnvironment = process.env.NODE_ENV || "developement";
const configs = require("../knexfile")[dbEnvironment];

module.exports = knex(configs);
