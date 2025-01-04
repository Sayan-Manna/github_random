const authService = require("../services/auth.service");

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await authService.login(username, password);
      req.session.userId = user.id;
      res.json({
        message: "Login successful",
        isFirstLogin: user.isFirstLogin,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy();
      res.json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Error during logout" });
    }
  }

  async resetPassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      await authService.resetPassword(
        req.session.userId,
        oldPassword,
        newPassword
      );
      res.json({ message: "Password reset successful" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const resetToken = await authService.forgotPassword(email);
      // In a real application, you would send this token via email
      res.json({ message: "Password reset token generated", resetToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async resetPasswordWithToken(req, res) {
    try {
      const { token, newPassword } = req.body;
      await authService.resetPasswordWithToken(token, newPassword);
      res.json({ message: "Password reset successful" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
