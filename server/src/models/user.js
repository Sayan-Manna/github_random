module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isFirstLogin: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    resetToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
};
