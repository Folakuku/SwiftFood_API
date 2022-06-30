const { Vendor } = require("../models");
const { Branch } = require("../models");
const { Customer } = require("../models");
const { Meal } = require("../models");
const { Transaction } = require("../models");
const { Order } = require("../models");
const { SalesHistory } = require("../models");
const { MealReview } = require("../models");
const { BranchRating } = require("../models");

// Vendor.hasMany(Branch, {
//   foreignKey: "vendorId",
// });
// Branch.belongsTo(Vendor, {
//   foreignKey: "vendorId",
// });
// Customer.hasMany(Transaction);
// Transaction.belongsTo(Customer);
// Transaction.belongsToMany(Meal, { through: Order });
// Meal.belongsToMany(Transaction, { through: Order });
// Meal.belongsTo(Branch);
// Branch.hasMany(Meal);
// SalesHistory.hasMany(Order);
// Order.belongsTo(SalesHistory);
// Branch.hasOne(SalesHistory);
// SalesHistory.belongsTo(Branch);
// // Here
Branch.hasMany(BranchRating);
Customer.hasMany(BranchRating);
BranchRating.belongsTo(Branch);
BranchRating.belongsTo(Customer);
Meal.hasMany(MealReview);
Customer.hasMany(MealReview);
MealReview.belongsTo(Meal);
MealReview.belongsTo(Customer);
