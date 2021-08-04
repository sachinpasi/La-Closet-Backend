const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getACategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/Category");
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../Middlewares/Authentication");
const { getUserById } = require("../Controllers/User");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/:categoryId", getACategory);

router.get("/categories", getAllCategory);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
