const route = require("express").Router();
const { isBranch } = require("../middlewares/checkAuth");
const { Meal } = require("../models");
const { Branch } = require("../models");
const { errorMsg } = require("../utils/response");

//Add Meal
route.post("/add", isBranch, async (req, res) => {
  try {
    let { name, price, discount, description, category, image } = req.body;
    if (!name || !price || !discount || !description || !category || !image) {
      return res.status(400).json({
        status: false,
        message:
          " Name, price, discount, description, category, image are all required",
      });
    }

    const branch = req.user;
    req.body.branchId = req.user.id;
    req.body.brandName = req.user.brandName;

    const exist = await Meal.findAll({
      where: { name, brandName: req.body.brandName },
    });

    if (exist.length > 0) {
      return res.status(400).json({
        status: false,
        message: "A meal is already registered with this name on your menu",
      });
    }

    const meal = await Meal.create(req.body);

    res.status(201).json({
      status: true,
      message: "Meal Added to Menu",
      data: meal,
    });
    console.log("Meal added");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

// GET MENU FOR ALL MEALS
route.get("/", async (req, res) => {
  try {
    const meals = await Meal.findAll();
    // const meals = await Meal.findAll({ include: "branch" });
    // for (const meal of meals) {
    //   meal.branch.set({ password: undefined });
    // }
    res.status(200).json({
      status: true,
      message: "Here are all meals",
      data: meals,
    });
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// GET MENU BY LOCATION

module.exports = route;
