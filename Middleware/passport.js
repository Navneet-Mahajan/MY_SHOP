require("dotenv").config({ path: "../.env" });
const passport = require("passport");
const JWTStategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const SECRET_KEY = process.env.SECRET_KEY;
const userSchema = require("../models/userSchema");
const mongoose = require("mongoose");

const User = mongoose.model("User", userSchema);
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};
console.log(SECRET_KEY);
passport.use(
  new JWTStategy(opts, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload.sub);
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
);

module.exports = { passport };
