"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ Transaction, Meal, SalesHistory }) {
      this.belongsTo(Meal, { foreignKey: "mealId", as: "meals" }),
        this.belongsTo(Transaction, {
          foreignKey: "transactionId",
          as: "transactions",
        }),
        this.belongsTo(SalesHistory, { foreignKey: "salesId", as: "sales" });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      mealId: { type: DataTypes.INTEGER, allowNull: false },
      transactionId: { type: DataTypes.INTEGER, allowNull: false },
      salesId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      discount: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};
