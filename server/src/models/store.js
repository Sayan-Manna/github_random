module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "store",
    {
      store_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "store_id",
      },
      store_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      manager_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Active",
        validate: {
          isIn: [["Active", "Inactive", "Closed"]],
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
