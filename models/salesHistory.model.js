const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const SalesHistory = sequelize.define("salesHistory", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
});

module.exports = { SalesHistory };
