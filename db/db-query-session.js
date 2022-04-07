const db = require("./db-config");

const sessionQueries = {
  setActiveSessionStatus: async (session, status) => {
    try {
      // Changes active status of session. Boolean.
      let newSession;
      const sessionData = await db("sessions")
        .where({ id: session })
        .update(status, ["id", "name"]);
      newSession = sessionData[0];

      // Returns structured session to the client.
      const sessionDetail = await db("sessions")
        .join("clubs", "sessions.venue_id", "=", "clubs.id")
        .select("clubs.number_of_courts", "clubs.name as club_name")
        .where({ "sessions.id": session });
      newSession.courts = sessionDetail[0].number_of_courts;
      newSession.club_name = sessionDetail[0].club_name;

      return newSession;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getAllClubs: async () => {
    try {
      const clubs = db("clubs").select();
      return clubs;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getSessionsByClub: (clubId) => {
    try {
      const sessions = db("sessions")
        .join("clubs", "sessions.venue_id", "=", "clubs.id")
        .select("sessions.id", "sessions.name", "sessions.extra_info")
        .where({ "clubs.id": clubId });
      return sessions;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = sessionQueries;
