const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getAllOrders, getOrder, updateOrder, getAdminOrder } = require("../controllers/order");
const { getUserByID } = require("../controllers/user");

router.param("userID", getUserByID);
router.get("/order/:orderID/:userID", isLoggedIn, isAuthenticated, getOrder);
router.get("/admin/order/:orderID/:userID", isLoggedIn, isAuthenticated, isAdmin, getAdminOrder);
router.get("/orders/:userID", isLoggedIn, isAuthenticated, isAdmin, getAllOrders);
router.put("/order/:orderID/:userID", isLoggedIn, isAuthenticated, isAdmin, updateOrder);

module.exports = router;
