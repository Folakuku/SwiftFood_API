const route = require("express").Router();
const { Vendor, Branch, Meal, SalesHistory } = require("../models");
const { isVendor, isBranch } = require("../middlewares/checkAuth");
const { generateHashedPassword } = require("../utils/password");
const { errorMsg } = require("../utils/response");

// Get Branches
route.get("/", async (req, res) => {
  try {
    const branches = await Branch.findAll({ include: "vendor" });
    branches.forEach((branch) => {
      branch.set({ password: undefined });
      branch.vendor.set({ password: undefined });
    });
    res.status(200).json({
      status: true,
      message: "These are all registered branches ",
      data: branches,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

// Register Branch By Vendor
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
    const branchId = branch.id;
    branch.set({ password: undefined });
    const salesHistory = await SalesHistory.create({ branchId });

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
      include: "meals",
    });
    branch.set({ password: undefined });
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

// Get Branch Sales
// route.get("/:branchName/sales",isBranch, async (req, res) => {
route.get("/:branchName/sales", async (req, res) => {
  try {
    const branchName = req.params.branchName;
    const branch = await Branch.findOne({
      where: { branchName },
      include: "sales",
    });
    branch.set({ password: undefined });
    res.status(200).json({
      status: true,
      message: "This is the sales record of this branch",
      data: branch,
    });
  } catch (err) {
    console.log(err);
    return errorMsg(res, "UNKNOWN ERROR", 500, err.message);
  }
});

module.exports = route;
