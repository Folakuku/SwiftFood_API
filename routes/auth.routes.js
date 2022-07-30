const router = require("express").Router();
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
const { Branch } = require("../models/branch.model");
const { SalesHistory } = require("../models/salesHistory.model");
const { Customer } = require("../models/customer.model");
const { Vendor } = require("../models/vendor.model");

// Branch Registration By Vendor
router.post(
  "/branches/register",
  isVendor,
  BranchSignupValidation,
  async (req, res) => {
    try {
      let { branchName, email, phone, state, city, password } = req.body;
      if (!branchName || !phone || !state || !city || !password) {
        return errorMsg(
          res,
          " branchName, phone, state, city, password are all required for registration",
          400
        );
      }

      if (password.length < 6) {
        return errorMsg(res, "Password must have at least 6 characters", 400);
      }
      const vendor = req.user;

      if (!email) {
        req.body.email = vendor.email;
      }

      const exist = await Branch.findAll({
        where: { vendorId: vendor.id, branchName },
      });

      if (exist.length > 0) {
        return errorMsg(
          res,
          "A branch is already registered with this name",
          400
        );
      }
      req.body.vendorId = vendor.id;
      req.body.branchName = branchName.toLowerCase();
      req.body.state = state.toLowerCase();
      req.body.city = city.toLowerCase();
      req.body.brandName = vendor.brandName;
      req.body.image = vendor.image;
      req.body.password = generateHashedPassword(password);
      const branch = await Branch.create(req.body);
      const branchId = branch.id;
      const token = generateToken(branch.id, "branch");
      branch.set({ password: undefined });
      const salesHistory = await SalesHistory.create({ branchId });
      successMsg(res, "Branch Registered", { branch, token }, 201);
    } catch (err) {
      console.log(err);
      return errorMsg(res, "UNKNOWN ERROR", 500, err.message || err);
    }
  }
);

// Branch Login
router.post("/branches/login", BranchSigninValidation, async (req, res) => {
  try {
    let { branchName, password } = req.body;
    if (!branchName || !password) {
      return errorMsg(res, "branchName and password is required", 400);
    }
    branchName = branchName.toLowerCase();
    const branch = await Branch.findOne({ where: { branchName } });
    if (!branch) {
      return errorMsg(res, "branch not registered", 400);
    }

    const valid = comparePassword(password, branch.password);
    if (!valid) {
      return errorMsg(res, "Password incorrect", 400);
    }

    const token = generateToken(branch.id, "branch");
    branch.set({ password: "" });
    successMsg(res, "Login Successful", { branch, token });
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
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
      const exist = await Customer.findOne({
        where: { email: email.toLowerCase() },
      });
      if (exist) {
        return errorMsg(res, "Email has already been registered");
      }
      req.body.email = email.toLowerCase();
      req.body.password = generateHashedPassword(password);
      const customer = await Customer.create(req.body);
      const token = generateToken(customer.id, "customer");
      customer.set({ password: undefined });

      successMsg(
        res,
        "Customer successfully registered",
        { customer, token },
        201
      );
    } catch (error) {
      console.log(error);
      errorMsg(res, "UNKNOWN ERROR", 500, error.message);
    }
  }
);

// Customer Login
router.post("/customers/login", SigninValidation, async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return errorMsg(res, "email and password are required for login");
    }
    email = email.toLowerCase();
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
    req.body.brandName = brandName.toLowerCase();
    req.body.email = email.toLowerCase();
    req.body.image =
      "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg";

    const exist = await Vendor.findAll({ where: { email } });
    if (exist.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Email already registered",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must have at least 6 characters",
      });
    }

    req.body.password = generateHashedPassword(password);
    const vendor = await Vendor.create(req.body);
    const token = generateToken(vendor.id, "vendor");
    vendor.set({ password: undefined });

    res.status(201).json({
      status: true,
      message: "Vendor Registered",
      data: { vendor, token },
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
    const vendor = await Vendor.findOne({
      where: { email: email.toLowerCase() },
    });
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
