const { Sequelize } = require("sequelize");
const dontenv = require("dotenv");
dontenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

module.exports = { sequelize };
