const route = require("express").Router();
const { isBranch } = require("../middlewares/checkAuth");
const { Meal } = require("../models/meal.model");

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

    // const branch = req.user;
    req.body.branchId = req.user.id;
    console.log(req.user.id);
    const meal = await Meal.create(req.body);

    res.status(201).json({
      status: true,
      message: "Meal Added to Menu",
      data: meal.toJSON(),
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

// Get menu
route.get("/all", (req, res) => {});

module.exports = route;
