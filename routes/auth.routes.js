const router = require("express").Router();
const { Vendor, Branch, Customer } = require("../models");
const { generateToken } = require("../utils/token");
const { comparePassword } = require("../utils/password");
const { errorMsg, successMsg } = require("../utils/response");
const {
  BranchSigninValidation,
  SigninValidation,
} = require("../middlewares/validators");

// Customer Login
router.post("/customers/login", SigninValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorMsg(res, "email and password are required for login");
    }
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return errorMsg(res, "Email not registered");
    }
    const valid = comparePassword(password, customer.password);
    if (!valid) {
      return errorMsg(res, "Password Incorrect", 401);
    }
    const token = generateToken(customer.id, "customer");
    customer.set({ password: undefined });
    successMsg(res, "Login Successfully", { customer, token }, 200);
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

// Vendor Login
router.post("/vendors/login", SigninValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password is required" });
    }
    const vendor = await Vendor.findOne({ where: { email } });
    if (!vendor) {
      return res
        .status(400)
        .json({ status: false, message: "Email not registered" });
    }

    const valid = comparePassword(password, vendor.password);
    if (!valid) {
      return res
        .status(400)
        .json({ status: false, message: "Password incorrect" });
    }

    const token = generateToken(vendor.id, "vendor");
    vendor.set({ password: undefined });
    res.json({
      status: true,
      message: "Login Successful",
      data: { token, vendor },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "UNKNOWN ERROR" });
  }
});

// Branch Login
router.post("/branches/login", BranchSigninValidation, async (req, res) => {
  try {
    const { branchName, password } = req.body;
    if (!branchName || !password) {
      return res
        .status(400)
        .json({ status: false, message: "branchName and password is required" });
    }
    const branch = await Branch.findOne({ where: { branchName } });
    if (!branch) {
      return res
        .status(400)
        .json({ status: false, message: "branch not registered" });
    }

    const valid = comparePassword(password, branch.password);
    if (!valid) {
      return res
        .status(400)
        .json({ status: false, message: "Password incorrect" });
    }

    const token = generateToken(branch.id, "branch");
    branch.set({ password: "" });
    res.json({
      status: true,
      message: "Login Successful",
      data: { token, branch },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "UNKNOWN ERROR" });
  }
});

module.exports = router;
