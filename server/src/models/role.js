module.exports = (sequelize, Sequelize) => {
  return sequelize.define("role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: [["Admin", "Technician", "Deployment Manager"]],
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
};
