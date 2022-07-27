const router = require("express").Router();
const { Order, Transaction, SalesHistory } = require("../models");
const { isLoggedIn } = require("../middlewares/checkAuth");
const { errorMsg, successMsg } = require("../utils/response");

// Make Order
router.post("/", isLoggedIn, async (req, res) => {
  let { cart, total } = req.body;
  const customerId = req.user.id;
  try {
    console.log(req.body);
    if (!cart.length || !total) {
      return errorMsg(res, "Cart and total are required");
    }
    // Calculate total
    const transaction = await Transaction.create({ total, customerId });
    cart.forEach(async (meal) => {
      if (!meal.discount) {
        meal.discount = 0;
      }
      const order = await Order.create({
        mealId: meal.mealId,
        transactionId: transaction.id,
        salesId: meal.branchId,
        quantity: meal.quantity,
        price: meal.price,
        discount: meal.discount,
      });
    });
    successMsg(res, "Order has been processed", req.body, 201);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// GET All Orders By Admin
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({ include: "meals" });
    return successMsg(res, "Here are all orders", orders, 200);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});
module.exports = router;
