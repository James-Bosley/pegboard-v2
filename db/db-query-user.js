const db = require("./db-config");
const bcrypt = require("bcrypt");

const userQueries = {
  // For User Authentication
  findByUsername: async (username, callback) => {
    try {
      const user = await db("users")
        .select("id", "password")
        .where({ email_address: username });
      if (user.length > 0) {
        return callback(null, user[0]);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  },
  findById: async (id, callback) => {
    try {
      const user = await db("users")
        .select("id", "email_address")
        .where({ id: id });
      if (user.length > 0) {
        return callback(null, user[0]);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  },

  // Add New User
  registerUser: async (newUser) => {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = hash;

      const user = await db("users").insert(newUser, ["id"]);
      if (user[0].id) {
        return 201;
      }
    } catch (err) {
      return 500;
    }
  },

  // Creates Structured User
  userData: async (userId) => {
    try {
      let user = {};

      const userData = await db("users")
        .select(
          "access_level",
          "first_name",
          "last_name",
          "email_address",
          "phone_number",
          "member_since"
        )
        .where({ id: userId });
      user.info = userData[0];

      const playerData = await db("users")
        .join("players", "users.id", "=", "players.user_id")
        .select("players.id", "players.display_name", "players.active_now")
        .where({ "users.id": userId });
      user.player = playerData[0];

      return user;
    } catch (err) {
      console.log(err);
      return 500;
    }
  },
};

module.exports = userQueries;

/*
        .join(
          "sessions_players",
          "players.id",
          "=",
          "sessions_players.player_id"
        )
        .join("sessions", "sessions_players.session_id", "=", "sessions.id")

   
          "sessions.id as session_id",
          "sessions.name as session_name",
          "sessions.session_active"*/
