const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword } = require("../controllers/userControllers");

// Register User
router.route("/register").post(registerUser);

// Login User
router.route('/login').post(loginUser);

// Password Forgot
router.route('/password/forgot').post(forgotPassword);

// Logout User
router.route('/logout').get(logout);

module.exports = router;