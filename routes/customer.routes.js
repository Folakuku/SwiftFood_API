const router = require("express").Router();
const { Customer, Transaction, Meal } = require("../models");
const { errorMsg, successMsg } = require("../utils/response");
const { isLoggedIn } = require("../middlewares/checkAuth");

// GET All Registered Customers By Admin
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    for (const customer of customers) {
      customer.set({ password: undefined });
    }
    successMsg(res, "Here are all the registered customers", customers);
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// GET All Customer Transactions
router.get("/transactions", isLoggedIn, async (req, res) => {
  try {
    const customerId = req.user.id;
    const transactions = await Transaction.findAll({
      where: { customerId },
      // include: { association: "meals", through: { attributes: ["quantity"] } },
      // include: "meals",
      include: "orders",
    });
    successMsg(res, "Here Are Your Transactions", transactions);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

module.exports = router;
