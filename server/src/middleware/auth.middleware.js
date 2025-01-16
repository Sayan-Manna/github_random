const db = require("../models");

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const user = await db.users.findOne({
        where: { id: req.session.userId },
        include: [{ model: db.roles }],
      });

      if (user && user.role.name === "Admin") {
        next();
      } else {
        res.status(403).json({ message: "Admin access required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error checking admin rights" });
    }
  },
};
