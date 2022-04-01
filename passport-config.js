const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dbUsers = require("./db/db-query-user");
const bcrypt = require("bcrypt");

// Local Strategy employs classic username / password authentication.
// If user does not exist or password is incorrect the user will not be serialized into a session.
passport.use(
  new LocalStrategy((username, password, done) => {
    dbUsers.findByUsername(username, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      // Compares hash of provided password with stored hash.
      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// Adds a user to the index of live sessions.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieves a serialized user and attaches it to the req object.
passport.deserializeUser((id, done) => {
  dbUsers.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;
