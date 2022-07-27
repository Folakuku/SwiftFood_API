const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const BranchRating = sequelize.define(
  "branch_rating",
  {
    rating: { type: DataTypes.SMALLINT, allowNull: false },
    review: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: "branchRatings",
    modelName: "BranchRating",
  }
);
module.exports = { BranchRating };
