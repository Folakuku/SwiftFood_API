const { Vendor } = require("../models");
const { Branch } = require("../models");
const { verifyToken } = require("../utils/token");

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
    res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
};

const isVendor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = checkRole(res, authHeader);
    const role = payload.role;
    if (!role) return;
    if (role !== "vendor") {
      return res.status(401).json({
        status: false,
        message: "Route is only accessible to vendors",
      });
    }
    const vendor = await Vendor.findOne({ where: { id: payload.id } });
    vendor.set({ password: "" });
    req.user = vendor;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isBranch = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = checkRole(res, authHeader);
    const role = payload.role;
    if (!role) return;
    console.log(role);
    if (role !== "branch") {
      return res.status(401).json({
        status: false,
        message: "Route is only accessible to branches",
      });
    }
    const branch = await Branch.findOne({ where: { id: payload.id } });
    branch.set({ password: "" });
    req.user = branch;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isVendor, isBranch };
