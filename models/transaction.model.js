"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate({ Customer, Order, Meal }) {
      this.belongsTo(Customer, { foreignKey: "customerId" }),
        this.belongsToMany(Meal, {
          through: Order,
          foreignKey: "transactionId",
        });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
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
  return Transaction;
};
