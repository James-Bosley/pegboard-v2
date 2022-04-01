const db = require("./db-config");
const reportGenerator = require("../reports/reportGenerator");

const reportQueries = {
  individualReport: async (id) => {
    try {
      // Retrieves players display name and ID.
      let player = await db("users")
        .join("players", "users.id", "=", "players.user_id")
        .select("players.id", "players.display_name")
        .where({ "users.id": id });
      player = player[0];

      // Total game wins by given player ID.
      let totalWins = await db("games")
        .count()
        .where({ player_id_win_1: player.id })
        .orWhere({ player_id_win_2: player.id });
      totalWins = totalWins[0].count;

      // Generates report with given parameters.
      const report = await reportGenerator({
        reportName: "Individual Player Report",
        user: player,
        dataPoints: [
          {
            name: "Total Wins",
            description:
              "Total number of games won across all formats and sessions",
            value: totalWins,
          },
        ],
      });
      return report;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = reportQueries;
