const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../../models/userModel");
const validateMongoDbID = require("../../utils/validateMongoDbID");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: process.env.TOKEN_SECRET_KEY,
    },
    (jwt_payload, done) => {
      // Validation mongoDBId
      try {
        validateMongoDbID(jwt_payload.id);
      } catch (error) {
        return done(error, false);
      }

      // Get user by id
      User.findById(jwt_payload.id, (err, user) => {
        if (err) return done(err, false);

        if (user) return done(null, user);

        return done(null, false);
        // or create a new account
      }).select("-password");
    }
  )
);
