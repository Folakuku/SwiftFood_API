const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const MealReview = sequelize.define("meal_review", {
  authorName: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.SMALLINT, allowNull: false },
  review: { type: DataTypes.TEXT },
  mealId: { type: DataTypes.INTEGER, allowNull: false },
  customerId: { type: DataTypes.INTEGER, allowNull: false },
});
module.exports = { MealReview };
