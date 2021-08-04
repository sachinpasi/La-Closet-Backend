const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// Import Models:-
const { validationResult } = require("express-validator");
const User = require("../Models/User");
// Sign Up :-
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: {
        message: errors.array()[0].msg,
        param: errors.array()[0].param,
      },
    });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: {
          message: "Not Able To Save User In DB",
        },
      });
    } else {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    }
  });
};

// Sign In:-
exports.signin = (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: {
        message: errors.array()[0].msg,
        param: errors.array()[0].param,
      },
    });
  }

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: {
          message: "User Does Not Exist",
        },
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: {
          message: "Email And Password Does Not Match",
        },
      });
    }
    // Create Token:-
    const token = jwt.sign({ _id: user.id }, process.env.SECRET);

    // Put Token In Cookie:-
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send Res To Frontend:-
    const { _id, name, email, role } = user;
    return res.json({ user: { _id, name, email, role, token } });
  });
};

// Sign Out:-
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Sign Out Successfully",
  });
};
