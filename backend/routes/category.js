const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getCategoryByID, getCategory, getAllCategories, createCategory, updateCategory, removeCategory } = require("../controllers/category");
const { getUserByID } = require("../controllers/user");

router.param("userID", getUserByID);
router.param("catID", getCategoryByID);

router.get("/category/:catID", getCategory);
router.get("/categories", getAllCategories);

router.post(
  "/category/create/:userID",
  check("name").notEmpty().withMessage("Collection Name is required"),
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
router.put(
  "/category/:catID/:userID",
  check("name").notEmpty().withMessage("Collection Name is required"),
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
router.delete("/category/:catID/:userID", isLoggedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;
