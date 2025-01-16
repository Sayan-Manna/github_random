const db = require("../models");
const Store = db.stores;

class StoreController {
  async createStore(req, res) {
    try {
      const store = await Store.create(req.body);
      res.json({
        message: "Store created successfully",
        store,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllStores(req, res) {
    try {
      const stores = await Store.findAll({
        include: [
          {
            model: db.pos_machines,
            attributes: ["machine_id", "serial_number", "status"],
          },
        ],
      });
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getStoreById(req, res) {
    try {
      const store = await Store.findByPk(req.params.id, {
        include: [
          {
            model: db.pos_machines,
            attributes: ["machine_id", "serial_number", "status"],
          },
        ],
      });
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStore(req, res) {
    try {
      const store = await Store.findByPk(req.params.id);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      await store.update(req.body);
      res.json({ message: "Store updated successfully", store });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new StoreController();
