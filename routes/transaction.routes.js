const router = require("express").Router();
const { Transaction } = require("../models");
const { isLoggedIn } = require("../middlewares/checkAuth");
const { errorMsg, successMsg } = require("../utils/response");

// GET all transactions
router.get("/", async (req, res) => {
  try {
    // const transactions = await Transaction.findAll();
    const transactions = await Transaction.findAll({
      include: "orders",
    });
    return successMsg(res, "Here are all transactions", transactions, 200);
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// Payment
router.post("/payment", async (req, res) => {
  try {
    const { total, transactionId } = req.body;
    if (!total || !transactionId) {
      return errorMsg(res, "total and transactionId must be supplied", 400);
    }
    let transaction = await Transaction.findOne({
      where: { id: transactionId },
    });
    // const success = process payment
    if (success) {
      req.body.status = "successful";
    } else req.body.status = "cancelled";
    transaction = await transaction.set(req.body).save();
    successMsg(res, "Transaction successful", transaction, 200);
  } catch (error) {
    errorMsg(error);
  }
});
module.exports = router;
