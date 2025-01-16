const express = require("express");
const router = express.Router();
const posMachineController = require("../controllers/pos_machine.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth.middleware");

router.post("/", isAdmin, posMachineController.createMachine);
router.get("/", isAuthenticated, posMachineController.getAllMachines);
router.get(
  "/store/:storeId",
  isAuthenticated,
  posMachineController.getMachinesByStore
);
router.put("/:id", isAdmin, posMachineController.updateMachine);

module.exports = router;
