const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Customer };
