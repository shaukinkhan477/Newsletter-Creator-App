const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // add to your .env file
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // add to your .env file
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // add to your .env file
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });
        if (!user) {
          // Create a new user if not exists
          user = await User.create({
            name: profile.displayName,
            email: email,
            oauthProvider: "google",
            oauthId: profile.id,
            // password: null,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
