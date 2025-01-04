const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../models");
const User = db.users;
const Role = db.roles;

class AuthService {
  async createAdmin() {
    const adminRole = await Role.findOrCreate({
      where: { name: "admin" },
      defaults: { name: "admin" },
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

  async createUser(userData, creatorId) {
    const creator = await User.findByPk(creatorId);
    if (!creator) throw new Error("Creator not found");

    const userRole = await Role.findOne({ where: { name: "user" } });
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return User.create({
      ...userData,
      password: hashedPassword,
      roleId: userRole.id,
      supervisorId: userData.supervisorId || null,
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

  async resetPasswordWithToken(token, newPassword) {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [db.Sequelize.Op.gt]: new Date() },
      },
    });

    if (!user) throw new Error("Invalid or expired token");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return user;
  }
}

module.exports = new AuthService();
