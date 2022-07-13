const router = require("express").Router();
const { Vendor, Branch, Customer, SalesHistory } = require("../models");
const { generateToken } = require("../utils/token");
const { comparePassword, generateHashedPassword } = require("../utils/password");
const { errorMsg, successMsg } = require("../utils/response");
const {
  BranchSigninValidation,
  BranchSignupValidation,
  CustomerSignupValidation,
  SigninValidation,
  VendorSignupValidation,
} = require("../middlewares/validators");
const { isVendor, isBranch } = require("../middlewares/checkAuth");

// Branch Registration By Vendor
router.post(
  "/branches/register",
  isVendor,
  BranchSignupValidation,
  async (req, res) => {
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
      return errorMsg(res, "UNKNOWN ERROR", 500, err.message);
    }
  }
);

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

// Customer Registration
router.post(
  "/customers/register",
  CustomerSignupValidation,
  async (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;
    try {
      if (!first_name || !last_name || !email || !phone || !password) {
        return errorMsg(
          res,
          "first_name,last_name,email,phone and password are required for registration"
        );
      }
      const exist = await Customer.findOne({ where: { email } });
      if (exist) {
        return errorMsg(res, "Email has already been registered");
      }
      req.body.password = generateHashedPassword(password);
      const customer = await Customer.create(req.body);
      customer.set({ password: undefined });

      successMsg(res, "Customer successfully registered", customer, 201);
    } catch (error) {
      console.log(error);
      errorMsg(res, "UNKNOWN ERROR", 500, error.message);
    }
  }
);

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

// Vendor Registration
router.post("/vendors/register", VendorSignupValidation, async (req, res) => {
  try {
    let { brandName, email, phone, password } = req.body;

    if (!brandName || !email || !phone || !password) {
      return res.status(400).json({
        status: false,
        message: "brandName, email, phone and password must be supplied",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must have at least 6 characters",
      });
    }

    const exist = await Vendor.findAll({ where: { email } });
    if (exist.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Email already registered",
      });
    }

    req.body.password = generateHashedPassword(password);
    const vendor = await Vendor.create(req.body);
    vendor.set({ password: "" });

    res.status(201).json({
      status: true,
      message: "Vendor Registered",
      data: vendor.toJSON(),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
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

module.exports = router;
