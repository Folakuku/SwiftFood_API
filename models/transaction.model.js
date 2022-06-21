const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Transaction = sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.ENUM("pending", "successful", "cancelled"),
    defaultValue: "pending",
  },
});

module.exports = { Transaction };
