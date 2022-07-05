const router = require("express").Router();
const { Order, Transaction, SalesHistory } = require("../models");
const { isLoggedIn } = require("../middlewares/checkAuth");
const { errorMsg, successMsg } = require("../utils/response");

// Make Order By Customer
router.post("/:id", isLoggedIn, async (req, res) => {
  const { salesId, quantity, price, discount, total } = req.body;
  const mealId = req.params.id;
  const customerId = req.user.id;
  //   get an array of orders and total or calculate the total here
  //   Get salesID from the meal model as the branch and sales have same id
  try {
    if (!salesId || !quantity || !price || !discount || !total) {
      return errorMsg(
        res,
        "salesId, quantity, discount and price, total are required"
      );
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
