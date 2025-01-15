const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Signup
router.post("/signup", authController.signup);

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", authController.logout);

// Forgot Password
router.post("/forgot-password", authController.forgotPassword);

// Reset Password
router.post("/reset-password", authController.resetPassword);

// Verify Email
// router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;
