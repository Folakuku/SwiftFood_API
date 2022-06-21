const route = require("express").Router();

route.get("/register", (req, res) => {
  res.status(200).json("Create Customer");
});

module.exports = route;
