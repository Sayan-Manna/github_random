const authService = require("../services/auth.service");
const db = require("../models");

class UserController {
  async createUser(req, res) {
    try {
      const { username, email, roleId } = req.body;

      if (!username || !email || !roleId) {
        return res.status(400).json({
          message: "Username, email, and role are required",
        });
      }

      const user = await authService.createUser({
        username,
        email,
        roleId,
      });

      res.json({
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roleId: user.roleId,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await db.users.findAll({
        attributes: ["id", "username", "email"],
        include: [
          {
            model: db.roles,
            attributes: ["name", "description"],
          },
        ],
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUserRole(req, res) {
    try {
      const { userId, roleId } = req.body;

      const user = await db.users.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const role = await db.roles.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      await user.update({ roleId });

      res.json({
        message: "User role updated successfully",
        user: {
          id: user.id,
          username: user.username,
          roleId: user.roleId,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
