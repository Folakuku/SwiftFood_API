const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");
// const Customer = require("./customer.model");

const Order = sequelize.define("order", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, allowNull: false },
  customerId: {
    type: DataTypes.INTEGER,
    references: { model: "Customers", key: "id" },
  },
});

module.exports = { Order };
