const route = require("express").Router();
const { Branch } = require("../models/branch.model");
const { Meal } = require("../models/meal.model");
const { isVendor } = require("../middlewares/checkAuth");
const { generateHashedPassword } = require("../utils/password");

// Get Branches
route.get("/", async (req, res) => {
  res.send("branches");
});

// Register Branch
route.post("/register", isVendor, async (req, res) => {
  try {
    let { branchName, email, phone, state, city, password } = req.body;
    if (!branchName || !phone || !state || !city || !password) {
      return res.status(400).json({
        status: false,
        message:
          " branchName, phone, state, city, password are all required for registration",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must have at least 6 characters",
      });
    }
    const vendor = req.user;

    if (!email) {
      req.body.email = vendor.email;
    }

    const exist = await Branch.findAll({
      where: { vendorId: vendor.id, branchName },
    });
    if (exist.length > 0) {
      return res.status(400).json({
        status: false,
        message: "A branch is already registered with this name",
      });
    }
    req.body.vendorId = vendor.id;
    req.body.brandName = vendor.brandName;
    req.body.password = generateHashedPassword(password);
    const branch = await Branch.create(req.body);
    branch.set({ password: "" });

    res.status(201).json({
      status: true,
      message: "Branch Registered",
      data: branch.toJSON(),
    });
    console.log("branch registered");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

// Get Branch Menu
route.get("/:branchName/menu", async (req, res) => {
  try {
    const branchName = req.params.branchName;
    const branch = await Branch.findOne({
      where: { branchName },
      include: Meal,
    });
    branch.set({ password: "" });
    res.status(200).json({
      status: true,
      message: "This is the branch with it's menu ",
      data: branch.toJSON(),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

module.exports = route;
