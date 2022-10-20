const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { isLoggedIn, isAuthenticated } = require("../controllers/auth");
const {
  getUserByID,
  getUser,
  updateUser,
  getOrders,
} = require("../controllers/user");

router.param("userID", getUserByID);
router.get("/user/:userID", isLoggedIn, isAuthenticated, getUser);
router.put(
  "/user/:userID",
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  isLoggedIn,
  isAuthenticated,
  updateUser
);

router.get("/user/orders/:userID", isLoggedIn, isAuthenticated, getOrders);

module.exports = router;
