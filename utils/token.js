const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_KEY, { expiresIn: "30d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

module.exports = { generateToken, verifyToken };
