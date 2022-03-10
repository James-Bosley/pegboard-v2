const db = require("./db-config");

const userQueries = {
  findByUsername: async (username, callback) => {
    try {
      const user = await db("users")
        .select()
        .where({ email_address: username });
      if (user.length > 0) {
        return callback(null, user);
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
        return callback(null, user);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  },
};

module.exports = userQueries;
