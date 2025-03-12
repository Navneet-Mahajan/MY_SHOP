const jwt = require("jsonwebtoken");
require("../Middleware/passport");
const passport = require("passport");

//authorize funtion checks if the user has valid role for a given function
exports.authorize =
  (roles = []) =>
  (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err, user, info) => {
        //callback
        try {
          if (err) {
            console.log("error in passport authentication");
            return res.status(500).json({ message: "Internal Server Error" });
          }
          if (!user) {
            return res.status(401).send("unathorized user");
          }
          if (roles.includes(user.role)) {
            req.user = user;
            next();
          } else {
            res.status(401).send("unauthorized acess");
          }
        } catch (error) {
          console.log("error during authorization");
        }
      }
    )(req, res, next);
  };
