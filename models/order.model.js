const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  mealId: { type: DataTypes.INTEGER, allowNull: false },
  transactionId: { type: DataTypes.INTEGER, allowNull: false },
  salesId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT },
});
module.exports = { Order };
