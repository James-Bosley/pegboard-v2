const db = require("./db-config");

const reportQueries = {
  getPlayer: async (userId) => {
    try {
      let player = await db("users")
        .join("players", "users.id", "=", "players.user_id")
        .select(
          "players.id",
          "players.display_name",
          "users.first_name",
          "users.last_name"
        )
        .where({ "users.id": userId });
      player = player[0];
      return player;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getPlayerWins: async (playerId) => {
    try {
      let totalWins = await db("games")
        .count()
        .where({ player_id_win_1: playerId })
        .orWhere({ player_id_win_2: playerId });
      totalWins = totalWins[0];
      return totalWins.count;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = reportQueries;
