const express = require("express");
const router = express.Router();

// middlewares

// controllers
const {
  signUp,
  signIn,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); // or router.post("/reset-password", resetPassword); // look at the controller for second option too

module.exports = router;
