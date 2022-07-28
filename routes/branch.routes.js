const router = require("express").Router();
const { isVendor, isBranch, isLoggedIn } = require("../middlewares/checkAuth");
const { generateHashedPassword } = require("../utils/password");
const { errorMsg, successMsg } = require("../utils/response");
const { BranchSignupValidation } = require("../middlewares/validators");
const { Branch } = require("../models/branch.model");
const { SalesHistory } = require("../models/salesHistory.model");
const { BranchRating } = require("../models/branchRating.model");

// Get Branches
router.get("/", async (req, res) => {
  try {
    const state = req.query.state;
    const city = req.query.city;
    let branches;
    if (state && city) {
      branches = await Branch.findAll({
        where: { state, city },
        include: "vendor",
      });
    } else if (state) {
      branches = await Branch.findAll({
        where: { state },
        include: "vendor",
      });
    } else {
      branches = await Branch.findAll({ include: "vendor" });
    }

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
    return errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// Register Branch By Vendor
router.post("/register", isVendor, BranchSignupValidation, async (req, res) => {
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
    const salesHistory = await SalesHistory.create({ id: branchId, branchId });

    res.status(201).json({
      status: true,
      message: "Branch Registered",
      data: branch,
    });
    console.log("branch registered");
  } catch (err) {
    console.log(err);
    return errorMsg(res, "UNKNOWN ERROR", 500, err.message);
  }
});

// Get Branch Menu
router.get("/:branchName/menu", async (req, res) => {
  try {
    const branchName = req.params.branchName;
    const branch = await Branch.findOne({
      where: { branchName },
      include: "meals",
    });
    if (!branch) {
      return errorMsg(res, `${branchName} is not a registered branch`, 400);
    }
    branch.set({ password: undefined });
    res.status(200).json({
      status: true,
      message: "This is the branch with it's menu ",
      data: branch,
    });
  } catch (err) {
    console.log(err);
    return errorMsg(res, "UNKNOWN ERROR", 500, err.message);
  }
});

// Get Branch Sales
// router.get("/:id/sales",isBranch, async (req, res) => {
router.get("/:id/sales", async (req, res) => {
  try {
    const branchId = req.params.id;
    const sales = await SalesHistory.findOne({
      where: { branchId },
      include: "orders",
    });
    res.status(200).json({
      status: true,
      message: "This is the sales record of this branch",
      data: sales,
    });
  } catch (err) {
    console.log(err);
    return errorMsg(res, "UNKNOWN ERROR", 500, err.message);
  }
});

// GET Branch Sales by branchName
router.get("/:branchName/sales", async (req, res) => {
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

// Rate Branch
router.post("/:id/rate", isLoggedIn, async (req, res) => {
  if (!req.body.rating || !req.body.review) {
    return errorMsg(res, "rating and review are required", 400);
  }
  req.body.branchId = req.params.id;
  req.body.customerId = req.user.id;
  req.body.authorName = req.user.first_name;
  try {
    const rating = await BranchRating.create(req.body);
    successMsg(res, "Review saved", rating, 201);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// Delete Branch
router.delete("/delete/:id", isVendor, async (req, res) => {
  try {
    const branch = await Branch.findOne({ where: { id: req.params.id } });
    if (!branch) {
      return errorMsg(res, "Branch Id unrecognized", 401);
    }
    if (branch.vendorId !== req.user.id) {
      return errorMsg(res, "UNAUTHORIZED", 401);
    }
    const deleted = await Branch.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return successMsg(res, "Branch account deleted", {});
    } else if (!deleted) {
      return errorMsg(
        res,
        `Branch with Id: "${req.params.id}" doesn't exist`,
        400
      );
    }
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

module.exports = router;
