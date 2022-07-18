const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productControllers");
const router = express.Router();

// Get all Products 
router.route("/products").get(getAllProducts);

// Create Product - Admin
router.route("/product/new").post(createProduct);

// Update Product - Admin
router.route("/product/:id").put(updateProduct);

// Delete Product - Admin
router.route("/product/:id").delete(deleteProduct);

// Get Product Details - Admin
router.route("/product/:id").get(getProductDetails);

module.exports = router;