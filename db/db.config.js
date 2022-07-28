const { Sequelize } = require("sequelize");
require("dotenv").config();
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DIALECT,
  DB_PORT,
  DB_USERNAME_P,
  DB_PASSWORD_P,
  DB_NAME_P,
  DB_HOST_P,
  DIALECT_P,
} = process.env;
// const env = process.env.NODE_ENV.trim() || "development";
// const config = require(__dirname + "/../config/config.js")[env];
// const db = {};
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   host: DB_HOST,
//   port: DB_PORT,
//   dialect: "postgres",
// });

const env = process.env.NODE_ENV.trim();
let sequelize;
if (process.env.NODE_ENV.trim() == "development") {
  sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  });
} else {
  sequelize = new Sequelize(DB_NAME_P, DB_USERNAME_P, DB_PASSWORD_P, {
    host: DB_HOST_P,
    port: DB_PORT,
    dialect: DIALECT_P,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

module.exports = { sequelize };
