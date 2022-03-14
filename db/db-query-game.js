const db = require("./db-config");

const gameQueries = {
  addGame: async (game) => {
    try {
      const newGame = await db("games").insert(game, ["id"]);
      return newGame[0].id;
    } catch (err) {
      return 500;
    }
  },
};

module.exports = gameQueries;
