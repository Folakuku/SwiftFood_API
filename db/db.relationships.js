// const {
//   Vendor,
//   Branch,
//   Customer,
//   Meal,
//   Transaction,
//   Order,
//   SalesHistory,
//   MealReview,
//   BranchRating,
// } = require("../models");

// // Vendor.hasMany(Branch, {
// //   foreignKey: "vendorId",
// // });
// // Branch.belongsTo(Vendor, {
// //   foreignKey: "vendorId",
// // });
// // Customer.hasMany(Transaction);
// // Transaction.belongsTo(Customer);
// // Transaction.belongsToMany(Meal, { through: Order });
// // Meal.belongsToMany(Transaction, { through: Order });
// // Meal.belongsTo(Branch);
// // Branch.hasMany(Meal);
// // SalesHistory.hasMany(Order);
// // Order.belongsTo(SalesHistory);
// // Branch.hasOne(SalesHistory);
// // SalesHistory.belongsTo(Branch);
// // // Here
// Branch.hasMany(BranchRating);
// Customer.hasMany(BranchRating);
// BranchRating.belongsTo(Branch);
// BranchRating.belongsTo(Customer);
// Meal.hasMany(MealReview);
// Customer.hasMany(MealReview);
// MealReview.belongsTo(Meal);
// MealReview.belongsTo(Customer);
