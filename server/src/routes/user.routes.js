const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth.middleware");

router.post("/", isAdmin, userController.createUser);
router.get("/", isAdmin, userController.getAllUsers);
router.get("/:id", isAuthenticated, userController.getUserById);
router.put("/:id", isAdmin, userController.updateUser);

module.exports = router;
