const express = require('express');
const { getSingleOrder, myOrders, newOrder } = require('../controllers/orderControllers');
const router = express.Router();
const { isAuthenticationUser, authorizeRoles } = require('../middleware/auth');

// Create Order
router.route("/order/new").post(isAuthenticationUser, newOrder);

// Get single Order
router.route("/order/:id").get(isAuthenticationUser, getSingleOrder);

// My Orders
router.route("/orders/me").get(isAuthenticationUser, myOrders);

module.exports = router;