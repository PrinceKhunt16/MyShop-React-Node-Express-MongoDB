const express = require("express");
const { processPayment, sendStripeApiKey, } = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuthenticationUser } = require('../middleware/auth');

router.route("/payment/process").post(isAuthenticationUser, processPayment);

router.route("/stripeapikey").get(isAuthenticationUser, sendStripeApiKey);

module.exports = router;