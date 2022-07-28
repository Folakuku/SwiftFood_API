const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const MealReview = sequelize.define(
  "meal_review",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: { type: DataTypes.SMALLINT, allowNull: false },
    review: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: "mealReviews",
    modelName: "MealReview",
  }
);
module.exports = { MealReview };
