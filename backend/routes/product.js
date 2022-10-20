const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getProductByID, createProduct, getProduct, getImage, updateProduct, removeProduct, getAllProducts } = require("../controllers/product");
const { getUserByID } = require("../controllers/user");

router.param("userID", getUserByID);
router.param("prodID", getProductByID);

router.post("/product/create/:userID", isLoggedIn, isAuthenticated, isAdmin, createProduct);
router.get("/product/:prodID", getProduct);
router.get("/product/image/:prodID", getImage);
router.get("/products", getAllProducts);

router.put("/product/:prodID/:userID", isLoggedIn, isAuthenticated, isAdmin, updateProduct);
router.delete("/product/:prodID/:userID", isLoggedIn, isAuthenticated, isAdmin, removeProduct);

module.exports = router;
