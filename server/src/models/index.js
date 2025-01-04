const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.roles = require("./role")(sequelize, Sequelize);

// Define relationships
db.roles.hasMany(db.users);
db.users.belongsTo(db.roles);

db.users.hasMany(db.users, { as: "subordinates", foreignKey: "supervisorId" });
db.users.belongsTo(db.users, { as: "supervisor", foreignKey: "supervisorId" });

module.exports = db;
