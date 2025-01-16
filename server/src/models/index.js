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
db.stores = require("./store")(sequelize, Sequelize);
db.pos_machines = require("./pos_machine")(sequelize, Sequelize);

// Define relationships
db.roles.hasMany(db.users);
db.users.belongsTo(db.roles);

// Store and POS Machine relationships
db.stores.hasMany(db.pos_machines, {
  foreignKey: "store_id",
  sourceKey: "store_id",
});
db.pos_machines.belongsTo(db.stores, {
  foreignKey: "store_id",
  targetKey: "store_id",
});

module.exports = db;
