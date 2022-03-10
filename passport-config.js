const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dbUsers = require("./db/db-query-user");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    dbUsers.findByUsername(username, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
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
