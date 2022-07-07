const router = require("express").Router();
const { SalesHistory, Order } = require("../models");
const { isLoggedIn, isVendor, isAdmin } = require("../middlewares/checkAuth");
const { errorMsg, successMsg } = require("../utils/response");

router.post("/:meal", isLoggedIn, (req, res) => {
  const meal = req.params.meal;
});

router.get("/", isAdmin, async (req, res) => {
  try {
    const sales = await SalesHistory.findAll({ include: "orders" });
    // const sales = await SalesHistory.findAll();
    return successMsg(res, "Here are all the Sales", sales, 200);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});
module.exports = router;
