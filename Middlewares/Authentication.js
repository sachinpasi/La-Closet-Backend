const dotenv = require("dotenv");
const expressJwt = require("express-jwt");

dotenv.config();

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["RSA", "sha1", "RS256", "HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: {
        message: "Access Denied ",
      },
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: {
        message: "User is Not Admin",
      },
    });
  }
  next();
};
