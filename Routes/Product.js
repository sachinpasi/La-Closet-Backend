const express = require("express");
const router = express.Router();

const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../Middlewares/Authentication");
const { getUserById } = require("../Controllers/User");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../Controllers/Product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.get("/products/all", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
