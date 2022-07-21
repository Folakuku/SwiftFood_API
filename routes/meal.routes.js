const router = require("express").Router();
const { isBranch } = require("../middlewares/checkAuth");
const cloudinary = require("../config/cloudinary.config");
const upload = require("../config/multer.config");
const { Meal } = require("../models");
const { Branch } = require("../models");
const { errorMsg, successMsg } = require("../utils/response");

//Add Meal
router.post("/add", isBranch, upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, description, category } = req.body;
    if (!name || !price || !discount || !description || !category) {
      return res.status(400).json({
        status: false,
        message:
          " Name, price, discount, description, category are all required",
      });
    }
    try {
      // ----------Setting Image----------
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${name}-image`,
        });
        req.body.image = result.secure_url;
      }
    } catch (error) {
      console.log(error);
      return errorMsg(res, "UNKNOWN ERROR", 500, error.message);
    }

    if (!req.body.image) {
      req.body.image =
        "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658332209/tnfg41aceuao0e5oahso.png";
    }

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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

// GET MENU FOR ALL MEALS
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    if (category) {
      const meals = await Meal.findAll({ where: { category } });
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
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// GET MENU BY CATEGORY
router.get("/category", async (req, res) => {
  try {
    const category = req.query.category;
    // const category = req.body.category;
    const meals = await Meal.findAll({ where: { category } });

    // Meal.findAll({ include: { model: Branch, where: { location } } });//findAll by location
    // const meals = Meal.findAll({ where: { category } }); // By location
    return successMsg(res, `Here are the meals in this category`, meals, 200);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// GET MENU BY LOCATION
// await Meal.findAll({ include: { model: Branch, where: { location } } });//find

// UPDATE MENU
router.put("/update/:id", isBranch, upload.single("image"), async (req, res) => {
  try {
    let meal = await Meal.findOne({ where: { id: req.params.id } });
    if (req.user.id !== meal.branchId) {
      return errorMsg(res, "UNAUTHORIZED", 401);
    }
    try {
      // ----------Setting Image----------
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${req.body.name || meal.name}-image`,
        });
        req.body.image = result.secure_url;
      }
    } catch (error) {
      console.log(error);
      return errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
    }

    meal = await meal.set(req.body).save();

    res.status(201).json({
      status: true,
      message: "Meal Updated",
      data: meal,
    });
  } catch (err) {
    console.log("err");
    console.log(err);
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
      return successMsg(res, "Meal account deleted", {});
    } else if (!deleted) {
      return errorMsg(
        res,
        `Meal with Id: "${req.params.id}" doesn't exist`,
        400
      );
    }
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

module.exports = router;
