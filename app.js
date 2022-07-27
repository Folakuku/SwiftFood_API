const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
// const { sequelize } = require("./models");
const { sequelize } = require("./db/db.config");
require("./db/db.relationships");
const mainRoutes = require("./routes/main.routes");
const vendorRoutes = require("./routes/vendor.routes");
const branchRoutes = require("./routes/branch.routes");
const customerRoutes = require("./routes/customer.routes");
const mealRoutes = require("./routes/meal.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const salesRoutes = require("./routes/salesHistory.routes");
const transactionRoutes = require("./routes/transaction.routes");
const { errorMsg } = require("./utils/response");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/", mainRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/vendors", vendorRoutes);
app.all("*", (req, res) => {
  errorMsg(res, "And Just Like That, You Completely Lost Your Way 😥", 404);
});

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
