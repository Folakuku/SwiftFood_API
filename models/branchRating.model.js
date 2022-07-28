const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const BranchRating = sequelize.define("branch_rating", {
  authorName: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.SMALLINT, allowNull: false },
  review: { type: DataTypes.TEXT },
  branchId: { type: DataTypes.INTEGER, allowNull: false },
  customerId: { type: DataTypes.INTEGER, allowNull: false },
});
module.exports = { BranchRating };
