const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const SalesHistory = sequelize.define(
  "sales_history",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    branchId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "SalesHistory",
    tableName: "salesHistories",
  }
);
module.exports = { SalesHistory };
