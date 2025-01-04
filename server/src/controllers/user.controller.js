const authService = require("../services/auth.service");
const db = require("../models");

class UserController {
  async createUser(req, res) {
    try {
      const user = await authService.createUser(req.body, req.session.userId);
      res.json({
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roleId: user.roleId,
          supervisorId: user.supervisorId,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await db.users.findAll({
        attributes: ["id", "username", "email", "roleId", "supervisorId"],
        include: [
          {
            model: db.roles,
            attributes: ["name"],
          },
          {
            model: db.users,
            as: "supervisor",
            attributes: ["username"],
          },
        ],
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await db.users.findByPk(req.params.id, {
        attributes: ["id", "username", "email", "roleId", "supervisorId"],
        include: [
          {
            model: db.roles,
            attributes: ["name"],
          },
          {
            model: db.users,
            as: "supervisor",
            attributes: ["username"],
          },
          {
            model: db.users,
            as: "subordinates",
            attributes: ["id", "username", "email"],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await db.users.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await user.update(req.body);
      res.json({
        message: "User updated successfully",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          roleId: updatedUser.roleId,
          supervisorId: updatedUser.supervisorId,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
