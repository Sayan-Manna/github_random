const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/reset-password", isAuthenticated, authController.resetPassword);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
