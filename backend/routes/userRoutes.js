const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userControllers");
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");

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

// Get all user
router.route('/admin/users').get(isAuthenticationUser, authorizeRoles("admin"), getAllUser);
 
// Get single user
router.route('/admin/user/:id').get(isAuthenticationUser, authorizeRoles("admin"), getSingleUser);

// Update user Role
router.route('/admin/user/:id').put(isAuthenticationUser, authorizeRoles("admin"), updateUserRole);

// Delete user
router.route('/admin/user/:id').delete(isAuthenticationUser, authorizeRoles("admin"), deleteUser);

module.exports = router;