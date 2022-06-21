const bcrypt = require("bcryptjs");

const generateHashedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { generateHashedPassword, comparePassword };
