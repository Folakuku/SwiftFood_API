const router = require("express").Router();
const { Transaction } = require("../models");
const { isLoggedIn } = require("../middlewares/checkAuth");
const { errorMsg, successMsg } = require("../utils/response");

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
module.exports = router;
