const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Welcome to the base endpoint",
    data: {
      app: "Swiftfoods",
      version: "1.0.0",
      desc: "Food vending system",
    },
  });
});

module.exports = router;
