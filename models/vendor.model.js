const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Vendor = sequelize.define(
  "vendor",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    brandName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, defaultValue: 3, allowNull: false },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "vendors",
    modelName: "Vendor",
  }
);
module.exports = { Vendor };
