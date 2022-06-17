const express = require("express");
require("dotenv").config();

const app = express();
const { sequelize } = require("./db/db.config");
const { Vendor } = require("./model/vendor.model");
const { Branch } = require("./model/branch.model");
const { Customer } = require("./model/customer.model");
const { Transaction } = require("./model/transaction.model");
const { Order } = require("./model/order.model");
const { Product } = require("./model/product.model");
const { SalesHistory } = require("./model/salesHistory.model");

Vendor.hasMany(Branch, {
  foreignKey: "vendorId",
});
Branch.belongsTo(Vendor);
Transaction.belongsTo(Customer);
Customer.hasMany(Transaction);
Transaction.belongsToMany(Product, { through: Order });
Product.belongsToMany(Transaction, { through: Order });
Branch.belongsToMany(Order, { through: SalesHistory });
Order.belongsToMany(Branch, { through: SalesHistory });

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    console.log("Database Synced");
  } catch (error) {
    console.log(error);
  }
})();

console.log("next");
