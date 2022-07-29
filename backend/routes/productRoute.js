const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productControllers");
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Get all Products 
router.route("/products").get(getAllProducts);

// Create Product - Admin
router.route("/admin/product/new").post(isAuthenticationUser, authorizeRoles("admin"), createProduct);

// Update Product - Admin
router.route("/admin/product/:id").put(isAuthenticationUser, authorizeRoles("admin"), updateProduct);

// Delete Product - Admin
router.route("/admin/product/:id").delete(isAuthenticationUser, authorizeRoles("admin"), deleteProduct);

// Get Product Details
router.route("/product/:id").get(getProductDetails);

// Create Product Review
router.route('/review').put(isAuthenticationUser, createProductReview);

// Get all Reviews of product
router.route('/reviews').get(getProductReviews);

// Delete Review of product
router.route('/reviews').delete(isAuthenticationUser, deleteReview);

// Delete Review of product
router.route('/admin/products').get(isAuthenticationUser, authorizeRoles("admin"), getAdminProducts);

module.exports = router;