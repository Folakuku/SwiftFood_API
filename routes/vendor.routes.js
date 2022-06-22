const route = require("express").Router();
const { isVendor } = require("../middlewares/checkAuth");
const { Branch } = require("../models/branch.model");
const { Vendor } = require("../models/vendor.model");
const { generateHashedPassword } = require("../utils/password");

// Get All Vendors
route.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    vendors.forEach((vendor) => {
      vendor.set({ password: "" });
    });
    if (vendors.length < 1) {
      console.log("There are no vendors");
      return res.status(200).json({
        status: true,
        message: "There are no registered vendors",
        data: vendors,
      });
    }
    res.status(200).json({
      status: true,
      message: "These are all registered vendors",
      data: vendors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

// Register Vendor
route.post("/register", async (req, res) => {
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

// Get All Branches
route.get("/branches", isVendor, async (req, res) => {
  const id = req.user.id;
  const vendor = await Vendor.findOne({ where: { id }, include: Branch });
  vendor.set({ password: "" });
  const branches = vendor.branches;
  branches.forEach((branch) => {
    branch.set({ password: "" });
  });
  console.log(vendor.toJSON());
  res.status(200).json({
    status: true,
    message: "These are the branches under this vendor",
    data: vendor,
  });
});

module.exports = route;
