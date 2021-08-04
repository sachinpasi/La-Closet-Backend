const express = require("express");
const router = express.Router();

const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../Middlewares/Authentication");
const { pushOrderInPurchaseList } = require("../Middlewares/Order");
const { getUserById } = require("../Controllers/User");
const { updateStock } = require("../Middlewares/Products");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStatus,
} = require("../Controllers/Order");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);
module.exports = router;
