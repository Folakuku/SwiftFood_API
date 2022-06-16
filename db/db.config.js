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

// sequelize
//   .authenticate()
//   .then((result) => console.log("Connection has been established successfully."))
//   .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = { sequelize };
