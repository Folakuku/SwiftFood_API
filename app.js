const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize } = require("./models");
const vendorRoutes = require("./routes/vendor.routes");
const branchRoutes = require("./routes/branch.routes");
const customerRoutes = require("./routes/customer.routes");
const mealRoutes = require("./routes/meal.routes");
const authRoutes = require("./routes/auth.routes");

// require("dotenv").config();
// require("./db/db.relationships");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    // await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
})();
