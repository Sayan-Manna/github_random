const db = require("../models");
const POSMachine = db.pos_machines;

class POSMachineController {
  async createMachine(req, res) {
    try {
      const machine = await POSMachine.create(req.body);
      res.json({
        message: "POS Machine created successfully",
        machine,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllMachines(req, res) {
    try {
      const machines = await POSMachine.findAll({
        include: [
          {
            model: db.stores,
            attributes: ["store_name", "location", "city"],
          },
        ],
      });
      res.json(machines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMachinesByStore(req, res) {
    try {
      const machines = await POSMachine.findAll({
        where: { store_id: req.params.storeId },
        include: [
          {
            model: db.stores,
            attributes: ["store_name", "location", "city"],
          },
        ],
      });
      res.json(machines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateMachine(req, res) {
    try {
      const machine = await POSMachine.findByPk(req.params.id);
      if (!machine) {
        return res.status(404).json({ message: "POS Machine not found" });
      }
      await machine.update(req.body);
      res.json({ message: "POS Machine updated successfully", machine });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new POSMachineController();
