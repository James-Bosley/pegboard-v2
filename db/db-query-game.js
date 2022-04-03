const db = require("./db-config");

const gameQueries = {
  // Completed games are stored in the database.
  addGame: async (game) => {
    try {
      const newGame = await db("games").insert(game, ["id"]);
      return newGame[0].id;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = gameQueries;
