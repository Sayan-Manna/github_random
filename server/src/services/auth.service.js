const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../models");
const User = db.users;
const Role = db.roles;

class AuthService {
  async createAdmin() {
    const adminRole = await Role.findOrCreate({
      where: { name: "Admin" },
      defaults: {
        name: "Admin",
        description: "System administrator with user management privileges",
      },
    });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    return User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      roleId: adminRole[0].id,
      isFirstLogin: false,
    });
  }

  async createUser(userData) {
    const role = await Role.findByPk(userData.roleId);
    if (!role) {
      throw new Error("Invalid role specified");
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    return User.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      roleId: userData.roleId,
      isFirstLogin: true,
    });
  }

  async login(username, password) {
    const user = await User.findOne({
      where: { username },
      include: [{ model: Role }],
    });

    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    return user;
  }

  async resetPassword(userId, oldPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) throw new Error("Invalid old password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isFirstLogin = false;
    await user.save();

    return user;
  }

  async forgotPassword(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1);

    user.resetToken = resetToken;
    user.resetTokenExpiry = tokenExpiry;
    await user.save();

    return resetToken;
  }
}

module.exports = new AuthService();
