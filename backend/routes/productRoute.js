const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productControllers");
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Get all Products 
router.route("/products").get(getAllProducts);

// Create Product - Admin
router.route("/product/new").post(isAuthenticationUser, authorizeRoles("admin"), createProduct);

// Update Product - Admin
router.route("/product/:id").put(isAuthenticationUser, authorizeRoles("admin"), updateProduct);

// Delete Product - Admin
router.route("/product/:id").delete(isAuthenticationUser, authorizeRoles("admin"), deleteProduct);

// Get Product Details - Admin
router.route("/product/:id").get(getProductDetails);

module.exports = router;