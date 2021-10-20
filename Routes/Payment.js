const express = require("express");
const { ProcessPayment, GetToken } = require("../Controllers/Payment");
const { getUserById } = require("../Controllers/User");
const router = express.Router();
const {
  isAuthenticated,
  isSignedIn,
} = require("../Middlewares/Authentication");

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, GetToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  ProcessPayment
);

module.exports = router;
