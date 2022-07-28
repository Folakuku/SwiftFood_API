const { Branch } = require("../models/branch.model");
const { Customer } = require("../models/customer.model");
const { Meal } = require("../models/meal.model");
const { Order } = require("../models/order.model");
const { SalesHistory } = require("../models/salesHistory.model");
const { Transaction } = require("../models/transaction.model");
const { Vendor } = require("../models/vendor.model");

Branch.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });
Branch.hasMany(Meal, { foreignKey: "branchId", as: "meals" });
Branch.hasOne(SalesHistory, { foreignKey: "branchId", as: "sales" });
Customer.hasMany(Transaction, { foreignKey: "customerId", as: "transactions" });
Meal.belongsToMany(Transaction, {
  through: Order,
  foreignKey: "mealId",
  as: "transactions",
});
Meal.hasMany(Order, { as: "orders", foreignKey: "mealId" });
Meal.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
Order.belongsTo(Meal, { foreignKey: "mealId", as: "meals" });
Order.belongsTo(Transaction, {
  foreignKey: "transactionId",
  as: "transactions",
});
Order.belongsTo(SalesHistory, { foreignKey: "salesId", as: "sales" });
SalesHistory.belongsTo(Branch, { as: "branch", foreignKey: "branchId" });
SalesHistory.hasMany(Order, { as: "orders", foreignKey: "salesId" });
Transaction.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Transaction.belongsToMany(Meal, {
  through: Order,
  foreignKey: "transactionId",
  as: "meals",
});
Transaction.hasMany(Order, { as: "orders", foreignKey: "transactionId" });
Vendor.hasMany(Branch, { foreignKey: "vendorId", as: "branches" });
