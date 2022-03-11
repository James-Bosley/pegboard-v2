const db = require("./db-config");

const sessionQueries = {
  setActiveSessionStatus: async (session, status) => {
    try {
      let newSession;
      const sessionData = await db("sessions")
        .where({ id: session })
        .update(status, ["id", "name"]);
      newSession = sessionData[0];

      const sessionDetail = await db("sessions")
        .join("clubs", "sessions.venue_id", "=", "clubs.id")
        .select("number_of_courts")
        .where({ "sessions.id": session });
      newSession.courts = sessionDetail[0].number_of_courts;

      if (newSession.id) {
        return newSession;
      }
    } catch (err) {
      return 500;
    }
  },
};

module.exports = sessionQueries;
