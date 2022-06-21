const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/db.config");

class Meal extends Model {}

Meal.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    discount: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("available", "unavailable"),
      defaultValue: "available",
    },
  },
  {
    sequelize,
    tableName: "meals",
    modelName: "Meal",
  }
);

module.exports = { Meal };
