const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Meal = sequelize.define(
  "meal",
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
    category: { type: DataTypes.ARRAY(DataTypes.STRING) },
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
module.exports = { Meal };
