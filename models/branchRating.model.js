"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
  return BranchRating;
};
