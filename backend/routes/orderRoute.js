const express = require('express');
const { getSingleOrder, myOrders, newOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderControllers');
const router = express.Router();
const { isAuthenticationUser, authorizeRoles } = require('../middleware/auth');

// Create Order
router.route("/order/new").post(isAuthenticationUser, newOrder);

// Get single Order
router.route("/order/:id").get(isAuthenticationUser, getSingleOrder);

// My Orders
router.route("/orders/me").get(isAuthenticationUser, myOrders);

// Get all Orders
router.route("/admin/orders").get(isAuthenticationUser, authorizeRoles("admin"), getAllOrders);

// Update Order
router.route("/admin/order/:id").put(isAuthenticationUser, authorizeRoles("admin"), updateOrder);

// Delete Order
router.route("/admin/order/:id").delete(isAuthenticationUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;