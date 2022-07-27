const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Transaction = sequelize.define(
  "transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    total: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "successful", "cancelled"),
      defaultValue: "pending",
    },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
  }
);
module.exports = { Transaction };
