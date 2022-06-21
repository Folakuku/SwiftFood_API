const { Sequelize } = require("sequelize");
const dontenv = require("dotenv");
dontenv.config();

const sequelize = new Sequelize(
  "swiftfood",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = { sequelize };
