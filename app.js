const express = require("express");
require("dotenv").config();

const app = express();
const { sequelize } = require("./db/db.config");
const { Vendor } = require("./model/vendor.model");
const { Branch } = require("./model/branch.model");

// Vendor.hasMany(Branch);
Branch.belongsTo(Vendor);

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    console.log("Database Synced");
  } catch (error) {
    console.log(error);
  }
})();

console.log("next");
