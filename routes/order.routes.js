const router = require("express").Router();
const { Order, Transaction, SalesHistory } = require("../models");
const { isLoggedIn } = require("../middlewares/checkAuth");
const { errorMsg, successMsg } = require("../utils/response");

// Make Order from req.params
router.post("/:id", isLoggedIn, async (req, res) => {
  const { quantity, price, discount, total } = req.body;
  const mealId = req.params.id;
  const customerId = req.user.id;
  //   get an array of orders and total or calculate the total here
  //   Get salesID from the meal model as the branch and sales have same id
  try {
    if (!quantity || !price || !discount || !total) {
      return errorMsg(res, "quantity, discount and price, total are required");
    }
    const transaction = await Transaction.create({ total, customerId });
    const transactionId = transaction.id;
    const order = await Order.create({
      mealId,
      transactionId,
      salesId,
      quantity,
      price,
      discount,
    });
    successMsg(res, "Order has been processed", order, 201);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// Make Order from array
router.post("/", isLoggedIn, async (req, res) => {
  let { mealId, branchId, quantity, price, discount, total } = req.body;
  const customerId = req.user.id;
  //   get an array of orders and total or calculate the total here
  try {
    if (!mealId || !branchId || !quantity || !price || !total) {
      return errorMsg(res, "quantity and price, total are required");
    }
    if (!discount) {
      discount = 0;
    }
    const transaction = await Transaction.create({ total, customerId });
    const order = await Order.create({
      mealId,
      transactionId: transaction.id,
      salesId: branchId,
      quantity,
      price,
      discount,
    });
    successMsg(res, "Order has been processed", order, 201);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// GET All Orders By Admin
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({ include: "meals" });
    return successMsg(res, "Here are all orders", orders, 200);
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});
module.exports = router;
