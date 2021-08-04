const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../Controllers/User");

const {} = require("../Controllers/Authentication");

const {
  isSignedIn,
  isAuthenticated,
} = require("../Middlewares/Authentication");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/orders/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;
