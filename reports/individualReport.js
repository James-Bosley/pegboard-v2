const db = require("../db/db-query-report");
const reportGenerator = require("./util/reportGenerator");

const individualReport = async (userId) => {
  try {
    const player = await db.getPlayer(userId);
    const report = await reportGenerator({
      reportName: `Individual Player Report - ${player.first_name} ${player.last_name}`,
      reportId: player.display_name,
      sections: [
        {
          title: "Player Profile",
          items: [
            { name: "PegBoard player ID", value: player.id },
            { name: "Display name", value: player.display_name },
          ],
        },
        {
          title: "Game Statistics",
          items: [
            {
              name: "Total Wins",
              description:
                "Total number of games won across all formats and sessions",
              value: await db.getPlayerWins(player.id),
            },
          ],
        },
      ],
    });
    return report;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = individualReport;
