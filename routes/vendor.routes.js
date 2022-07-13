const router = require("express").Router();
const { isVendor } = require("../middlewares/checkAuth");
const { Branch } = require("../models");
const { Vendor } = require("../models");

// Get All Vendors
router.get("/", async (req, res) => {
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

// Get All Branches Under A Vendor
router.get("/branches", isVendor, async (req, res) => {
  try {
    const id = req.user.id;
    const vendor = await Vendor.findOne({ where: { id }, include: "branches" });
    vendor.set({ password: undefined });
    const branches = vendor.branches;
    branches.forEach((branch) => {
      branch.set({ password: undefined });
    });
    res.status(200).json({
      status: true,
      message: "These are the branches under this vendor",
      data: vendor,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

// GET Sales Records Of Branches

module.exports = router;
