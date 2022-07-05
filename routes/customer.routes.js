const route = require("express").Router();
const { Customer, Transaction, Meal } = require("../models");
const { errorMsg, successMsg } = require("../utils/response");
const { generateHashedPassword } = require("../utils/password");
const { isLoggedIn } = require("../middlewares/checkAuth");

// Customer Registration
route.post("/register", async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !phone || !password) {
      return errorMsg(
        res,
        "first_name,last_name,email,phone and password are required for registration"
      );
    }
    const exist = await Customer.findOne({ where: { email } });
    if (exist) {
      return errorMsg(res, "Email has already been registered");
    }
    req.body.password = generateHashedPassword(password);
    const customer = await Customer.create(req.body);
    customer.set({ password: undefined });

    successMsg(res, "Customer successfully registered", customer, 201);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// GET All Registered Customers By Admin
route.get("/", async (req, res) => {
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
route.get("/transactions", isLoggedIn, async (req, res) => {
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

module.exports = route;
