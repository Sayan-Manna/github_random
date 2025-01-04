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
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await db.users.findOne({
      where: { id: req.session.userId },
      include: [{ model: db.roles }],
    });

    if (user && user.role.name === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  },
};
