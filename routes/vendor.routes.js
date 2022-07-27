const router = require("express").Router();
const { isVendor } = require("../middlewares/checkAuth");
const cloudinary = require("../config/cloudinary.config");
const upload = require("../config/multer.config");
const { Branch, Vendor } = require("../models");
const { errorMsg, successMsg } = require("../utils/response");

// Get All Vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    vendors.forEach((vendor) => {
      vendor.set({ password: undefined });
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

// GET Menu of Branches of Vendor
router.get("/:id/menu", async (req, res) => {
  try {
    // save location as a global var and filter
    const branches = await Branch.findAll({
      where: { vendorId: req.params.id },
      include: "meals",
    });
    branches.forEach((branch) => {
      branch.set({ password: undefined });
    });
    successMsg(res, "These are the meals under this vendor", branches);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// GET Sales Records Of Branches

// UPDATE Vendors
router.put("/update/:id", isVendor, upload.single("image"), async (req, res) => {
  try {
    let vendor = await Vendor.findOne({ where: { id: req.params.id } });
    if (req.user.id != req.params.id) {
      return errorMsg(res, "UNAUTHORIZED", 401);
    }
    try {
      // ----------Setting Image----------
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${req.body.name || vendor.brandName}-image`,
        });
        req.body.image = result.secure_url;
      }
    } catch (error) {
      console.log(error);
      return errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
    }

    vendor = await vendor.set(req.body).save();
    vendor.set({ password: undefined });

    res.status(200).json({
      status: true,
      message: "Vendor updated",
      data: vendor,
    });
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// Delete vendor
router.delete("/delete/:id", async (req, res) => {
  try {
    const vendor = await Vendor.destroy({ where: { id: req.params.id } });
    console.log(vendor);
    if (vendor) {
      return successMsg(res, "Vendor account deleted", {});
    } else if (!vendor) {
      return errorMsg(
        res,
        `Vendor with Id: "${req.params.id}" doesn't exist`,
        400
      );
    }
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
});

module.exports = router;
