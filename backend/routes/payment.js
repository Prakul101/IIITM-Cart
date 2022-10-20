const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthenticated } = require("../controllers/auth");
const { processPayment } = require("../controllers/payment");
const { updateInventory } = require("../controllers/product");
const { getUserByID } = require("../controllers/user");

router.param("userID", getUserByID);
router.post(
  "/payment/:userID",
  isLoggedIn,
  isAuthenticated,
  processPayment,
  updateInventory
);

module.exports = router;
