const route = require("express").Router();
const { Vendor } = require("../models/vendor.model");
const { Branch } = require("../models/branch.model");
const { generateToken } = require("../utils/token");
const { comparePassword } = require("../utils/password");

// Vendor Login
route.post("/vendors/login", async (req, res) => {
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
    vendor.set({ password: "" });
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
route.post("/branches/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password is required" });
    }
    const branch = await Branch.findOne({ where: { email } });
    if (!branch) {
      return res
        .status(400)
        .json({ status: false, message: "Email not registered" });
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

module.exports = route;
