const { Vendor, Branch, Customer } = require("../models");
const { verifyToken } = require("../utils/token");
const { errorMsg } = require("../utils/response");

const checkRole = (res, authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("no token");
    return res.status(401).json({
      status: false,
      message: "No token provided",
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
};

const isAdmin = async (res, req, next) => {
  // check if admin
  next();
};

const isVendor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = checkRole(res, authHeader);
    const role = payload.role;
    if (!role || role !== "vendor") {
      return res.status(401).json({
        status: false,
        message: "Route is only accessible to vendors",
      });
    }
    const vendor = await Vendor.findOne({ where: { id: payload.id } });
    if (!vendor) {
      console.log("no vendor");
      return errorMsg(res, "VendorId Not Recognized");
    }
    vendor.set({ password: undefined });
    req.user = vendor;
    next();
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
    console.log(error);
  }
};

const isBranch = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = checkRole(res, authHeader);
    const role = payload.role;
    if (!role || role !== "branch") {
      return res.status(401).json({
        status: false,
        message: "Route is only accessible to branches",
      });
    }
    const branch = await Branch.findOne({ where: { id: payload.id } });
    branch.set({ password: undefined });
    req.user = branch;
    next();
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = checkRole(res, authHeader);
    const role = payload.role;
    if (!role || role !== "customer") {
      return errorMsg(res, "Route is only accessible to logged in customers");
    }
    const customer = await Customer.findOne({ where: { id: payload.id } });
    customer.set({ password: undefined });
    req.user = customer;
    next();
  } catch (error) {
    errorMsg(res, "UNKNOWN ERROR", 500, error.message);
  }
};

module.exports = { isVendor, isBranch, isLoggedIn, isAdmin };
