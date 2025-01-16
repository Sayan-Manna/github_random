module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "pos_machine",
    {
      machine_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "machine_id",
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "stores",
          key: "store_id",
        },
      },
      serial_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Operational",
        validate: {
          isIn: [["Operational", "Non-operational"]],
        },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["Fixed", "Mobile"]],
        },
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      purchase_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      warranty_expiry: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      last_serviced: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
