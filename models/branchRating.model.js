const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/db.config");

class BranchRating extends Model {}

BranchRating.init(
  {
    rating: { type: DataTypes.TINYINT, allowNull: false },
    review: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: "branchRatings",
    modelName: "BranchRating",
  }
);

module.exports = { BranchRating };
