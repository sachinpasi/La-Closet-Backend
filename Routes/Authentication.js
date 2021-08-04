const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Import Controllers:-
const { signout, signup, signin } = require("../Controllers/Authentication");
const { isSignedIn } = require("../Middlewares/Authentication");

// Actual Routes:-

router.post(
  "/signup",
  [
    check("name", "Name Should Be At Least 3 Char").isLength({ min: 3 }),
    check("email", "Email Is Required").isEmail(),
    check("password", "Password Should Be At Least 3 Char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email Is Required").isEmail(),
    check("password", "Password Is Required").isLength({
      min: 3,
    }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
