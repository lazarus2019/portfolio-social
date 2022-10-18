const passport = require("passport");
module.exports = {
  passportAuthJwt: passport.authenticate("jwt", { session: false }),
};
