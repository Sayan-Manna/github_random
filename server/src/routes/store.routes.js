const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth.middleware");

router.post("/", isAdmin, storeController.createStore);
router.get("/", isAuthenticated, storeController.getAllStores);
router.get("/:id", isAuthenticated, storeController.getStoreById);
router.put("/:id", isAdmin, storeController.updateStore);

module.exports = router;
