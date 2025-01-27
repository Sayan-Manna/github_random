require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const authService = require("./services/auth.service");
const storeRoutes = require("./routes/store.routes");
const posMachineRoutes = require("./routes/pos_machine.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/pos-machines", posMachineRoutes);

const PORT = process.env.PORT || 3000;

// Database initialization and server start
db.sequelize.sync({ alter: true }).then(async () => {
  console.log("Database synchronized");

  // Create default roles
  await db.roles.bulkCreate(
    [
      {
        name: "Admin",
        description: "System administrator with user management privileges",
      },
      {
        name: "Technician",
        description: "Technical support and implementation specialist",
      },
      {
        name: "Deployment Manager",
        description: "Manages deployment operations and coordinates activities",
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  // Create default admin user
  await authService.createAdmin();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
