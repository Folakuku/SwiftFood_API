"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalesHistory extends Model {
    static associate({ Order, Branch }) {
      this.belongsTo(Branch, { foreignKey: "branchId" }),
        this.hasMany(Order, { foreignKey: "salesId" });
    }
  }

  SalesHistory.init(
    {
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      discount: { type: DataTypes.FLOAT, allowNull: false },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      branchId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "SalesHistory",
      tableName: "salesHistories",
    }
  );
  return SalesHistory;
};
