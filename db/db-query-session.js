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
        .select("clubs.number_of_courts", "clubs.name as club_name")
        .where({ "sessions.id": session });
      newSession.courts = sessionDetail[0].number_of_courts;
      newSession.club_name = sessionDetail[0].club_name;
      if (newSession.id) {
        return newSession;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = sessionQueries;
