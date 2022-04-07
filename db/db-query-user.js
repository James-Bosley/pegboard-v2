const db = require("./db-config");
const bcrypt = require("bcrypt");

const userQueries = {
  // For user authentication and deserialization.
  findByUsername: async (username, callback) => {
    try {
      const user = await db("users")
        .select()
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
      const user = await db("users").select().where({ id: id });
      if (user.length > 0) {
        return callback(null, user[0]);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  },

  // Add new user.
  registerUser: async (newUser) => {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = hash;

      const user = await db("users").insert(newUser, ["id"]);
      return user[0].id;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  // Creates structured user to be returned to the client.
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
        .select(
          "players.id",
          "players.display_name",
          "players.gender",
          "players.handedness"
        )
        .where({ "users.id": userId });
      user.player = playerData[0];

      const sessionData = await db("users")
        .join("players", "users.id", "=", "players.user_id")
        .join(
          "sessions_players",
          "players.id",
          "=",
          "sessions_players.player_id"
        )
        .join("sessions", "sessions_players.session_id", "=", "sessions.id")
        .select(
          "sessions.id",
          "sessions.name",
          "sessions.venue_id",
          "sessions.session_active"
        )
        .where({ "users.id": userId });
      user.sessions = sessionData;

      if (user.info.access_level === "session_rep") {
        const repData = await db("users")
          .join(
            "sessions_admin_users",
            "users.id",
            "=",
            "sessions_admin_users.user_id"
          )
          .join(
            "sessions",
            "sessions_admin_users.session_id",
            "=",
            "sessions.id"
          )
          .select("sessions.id", "sessions.name", "sessions.session_active")
          .where({ "users.id": userId });
        user.rep = repData;
      }
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  // Updates the player profile of the user.
  updatePlayer: async (newPlayer) => {
    try {
      const player = await db("players").where({ id: newPlayer.id }).update(
        {
          display_name: newPlayer.display_name,
          gender: newPlayer.gender,
          handedness: newPlayer.handedness,
        },
        ["*"]
      );
      return player[0];
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  addAccessRequest: async (user, requestData) => {
    try {
      requestData = { ...requestData, user_id: user };
      const request = await db("access_requests").insert(requestData, [
        "user_id",
      ]);
      return request[0].user_id;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = userQueries;
