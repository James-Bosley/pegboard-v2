const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dbUsers = require("./db/db-query-user");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy((username, password, done) => {
    dbUsers.findByUsername(username, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  dbUsers.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;