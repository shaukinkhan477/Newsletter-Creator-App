const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");


// Standard signup, login, logout, etc.

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


// OAuth: Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// OAuth callback endpoint
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  authController.googleCallback
);

module.exports = router;
