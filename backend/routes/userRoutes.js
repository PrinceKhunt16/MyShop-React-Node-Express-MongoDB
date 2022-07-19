const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userControllers");

// Register User
router.route("/register").post(registerUser);

// Login User
router.route('/login').post(loginUser);

module.exports = router;