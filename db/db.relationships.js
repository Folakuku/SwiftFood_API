const { Vendor } = require("../models/vendor.model");
const { Branch } = require("../models/branch.model");
const { Customer } = require("../models/customer.model");
const { Meal } = require("../models/meal.model");
const { Transaction } = require("../models/transaction.model");
const { Order } = require("../models/order.model");
const { SalesHistory } = require("../models/salesHistory.model");
const { MealReview } = require("../models/mealReview.model");
const { BranchRating } = require("../models/branchRating.model");

Vendor.hasMany(Branch, {
  foreignKey: "mainBranch",
});
Branch.belongsTo(Vendor, {
  foreignKey: "mainBranch",
});
Customer.hasMany(Transaction);
Transaction.belongsTo(Customer);
Transaction.belongsToMany(Meal, { through: Order });
Meal.belongsToMany(Transaction, { through: Order });
Meal.belongsTo(Branch);
Branch.hasMany(Meal);
SalesHistory.hasMany(Order);
Order.belongsTo(SalesHistory);
Branch.hasOne(SalesHistory);
SalesHistory.belongsTo(Branch);
Branch.hasMany(BranchRating);
Customer.hasMany(BranchRating);
BranchRating.belongsTo(Branch);
BranchRating.belongsTo(Customer);
Meal.hasMany(MealReview);
Customer.hasMany(MealReview);
MealReview.belongsTo(Meal);
MealReview.belongsTo(Customer);
