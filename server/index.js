require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync({ force: true }); // Be careful with force: true in production!
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
