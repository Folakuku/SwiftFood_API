const router = require("express").Router();
const { isBranch } = require("../middlewares/checkAuth");
const cloudinary = require("../config/cloudinary.config");
const upload = require("../config/multer.config");
const { Meal } = require("../models");
const { Branch } = require("../models");
const { errorMsg, successMsg } = require("../utils/response");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

//Add Meal
router.post("/add", isBranch, upload.single("image"), async (req, res) => {
  try {
    let { category, ...input } = req.body;
    let { name, price, description } = input;
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        status: false,
        message: " Name, price, description, category are all required",
      });
    }
    if (!input.sellingPrice) {
      input.sellingPrice = price;
    }
    try {
      // ----------Setting Image----------
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${name}-image`,
        });
        input.image = result.secure_url;
      }
    } catch (error) {
      console.log(error);
      return errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
    }

    if (!input.image) {
      input.image =
        "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658332209/tnfg41aceuao0e5oahso.png";
    }

    input.branchId = req.user.id;
    input.brandName = req.user.brandName;

    const exist = await Meal.findAll({
      where: { name, brandName: input.brandName },
    });

    if (exist.length > 0) {
      return res.status(400).json({
        status: false,
        message: "A meal is already registered with this name on your menu",
      });
    }
    if (typeof category != Array) {
      category = category.split(" ");
    }
    let meal = await Meal.create(input);
    await sequelize.query(
      `UPDATE meals SET category = '{${category}}' WHERE id= ${meal.id}`
    );
    meal.set({ category: category });
    successMsg(res, "Meal Added to Menu", meal, 201);
  } catch (error) {
    console.log(error);
    return errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// GET MENU FOR ALL MEALS
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    if (category) {
      const meals = await Meal.findAll({
        where: { category: { [Op.contains]: [category] } },
      });
      return successMsg(res, `Here are the meals in this category`, meals, 200);
    } else {
      // const meals = await Meal.findAll({ include: { model: Branch, where: { location } } });//find by location
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
    }
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// GET MENU BY LOCATION
// await Meal.findAll({ include: { model: Branch, where: { location } } });//find

// UPDATE MENU
router.put("/update/:id", isBranch, upload.single("image"), async (req, res) => {
  try {
    let { category, ...change } = req.body;
    let meal = await Meal.findOne({ where: { id: req.params.id } });
    // if (req.user.id !== meal.branchId) {
    //   return errorMsg(res, "UNAUTHORIZED", 401);
    // }
    try {
      // ----------Setting Image----------
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${change.name || meal.name}-image`,
        });
        change.image = result.secure_url;
      }
    } catch (error) {
      console.log(error);
      return errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
    }

    meal = await meal.set(change);
    if (category) {
      if (typeof category != Array) {
        category = category.split(" ");
      }
      await sequelize.query(
        `UPDATE meals SET category = '{${category}}' WHERE id= ${meal.id}`
      );
    }
    meal = await meal.save();
    if (category) meal.set({ category: category });
    console.log(typeof change.price);
    res.status(201).json({
      status: true,
      message: "Meal Updated",
      data: meal,
    });
  } catch (error) {
    console.log(error);
    return errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// Delete Meal
router.delete("/delete/:id", isBranch, async (req, res) => {
  try {
    const meal = await Meal.findOne({ where: { id: req.params.id } });
    if (!meal) {
      return errorMsg(res, "Meal Id unrecognized", 401);
    }
    if (meal.branchId !== req.user.id) {
      return errorMsg(res, "UNAUTHORIZED", 401);
    }
    const deleted = await meal.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return successMsg(res, "Meal deleted", {});
    } else if (!deleted) {
      return errorMsg(
        res,
        `Meal with Id: "${req.params.id}" doesn't exist`,
        400
      );
    }
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

module.exports = router;
