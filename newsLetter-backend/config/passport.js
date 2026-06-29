const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");
const env = require("./env");

const hasGoogleOAuthConfig =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL;

if (hasGoogleOAuthConfig) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();

          if (!email) {
            return done(new Error("Google profile did not include an email"), null);
          }

          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email,
              oauthProvider: "google",
              oauthId: profile.id,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
} else if (env.isProduction) {
  console.warn("Google OAuth is disabled because GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_CALLBACK_URL is missing.");
}

passport.isGoogleOAuthConfigured = Boolean(hasGoogleOAuthConfig);

module.exports = passport;
