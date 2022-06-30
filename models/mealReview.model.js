"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MealReview extends Model {}

  MealReview.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rating: { type: DataTypes.TINYINT, allowNull: false },
      review: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      tableName: "mealReviews",
      modelName: "MealReview",
    }
  );
  return MealReview;
};
