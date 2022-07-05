require("dotenv").config();
const fs = require("fs");
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_USERNAME_P,
  DB_PASSWORD_P,
  DB_NAME_P,
  DB_HOST_P,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: DB_USERNAME_P,
    password: DB_PASSWORD_P,
    database: DB_NAME_P,
    host: DB_HOST_P,
    dialect: "mysql",
  },
};
