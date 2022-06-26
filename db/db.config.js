const { Sequelize } = require("sequelize");
const dontenv = require("dotenv");
dontenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, NODE_ENV } = process.env;

const sequelize = new Sequelize("swiftfood", DB_USERNAME, DB_PASSWORD, {
  host: NODE_ENV === "production" ? DB_HOST : "127.0.0.1",
  dialect: "mysql",
});

module.exports = { sequelize };
