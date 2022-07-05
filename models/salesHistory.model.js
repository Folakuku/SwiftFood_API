"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalesHistory extends Model {
    static associate({ Order, Branch }) {
      this.belongsTo(Branch, { as: "branch", foreignKey: "branchId" }),
        this.hasMany(Order, { as: "orders", foreignKey: "salesId" });
    }
  }

  SalesHistory.init(
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
  return SalesHistory;
};
