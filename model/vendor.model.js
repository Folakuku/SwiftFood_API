const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Vendor = sequelize.define("Vendor", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  vendor_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 3, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Vendor };
