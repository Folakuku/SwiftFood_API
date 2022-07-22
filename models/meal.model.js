"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    static associate({ Transaction, Order, Branch }) {
      this.belongsToMany(Transaction, {
        through: Order,
        foreignKey: "mealId",
        as: "transactions",
      }),
        this.hasMany(Order, { as: "orders", foreignKey: "mealId" }),
        this.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
    }
  }

  Meal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      brandName: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      sellingPrice: { type: DataTypes.FLOAT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      category: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM("available", "unavailable"),
        defaultValue: "available",
      },
      branchId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: "meals",
      modelName: "Meal",
    }
  );
  return Meal;
};
