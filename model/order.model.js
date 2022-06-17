const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Order = sequelize.define("Order", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, allowNull: false },
  customerId: {
    type: DataTypes.INTEGER,
    references: { model: Customer, key: "id" },
  },
});

module.exports = { Order };
