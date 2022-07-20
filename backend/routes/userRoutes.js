const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile } = require("../controllers/userControllers");
const { isAuthenticationUser } = require("../middleware/auth");

// Register User
router.route("/register").post(registerUser);

// Login User
router.route('/login').post(loginUser);

// Password Forgot
router.route('/password/forgot').post(forgotPassword);

// Reset Password
router.route('/password/reset/:token').put(resetPassword);

// Logout User
router.route('/logout').get(logout);

// Get User details
router.route('/me').get(isAuthenticationUser, getUserDetails);

// Update Password
router.route('/password/update').put(isAuthenticationUser, updatePassword);

// Update Profile
router.route('/me/update').put(isAuthenticationUser, updateUserProfile);

module.exports = router;