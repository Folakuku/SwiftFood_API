const route = require("express").Router();
const { Customer } = require("../models/customer.model");

route.get("/register", async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !phone || !password) {
      return res.status(500).json({
        status: false,
        message:
          "first_name,last_name,email,phone and password are required for registration",
      });
    }
    const exist = Customer.findOne({ where: { email } });

    res.status(201).json("Create Customer");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "UNKNOWN ERROR",
    });
  }
});

module.exports = route;
