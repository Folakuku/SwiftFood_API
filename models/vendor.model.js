"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate({ Branch }) {
      this.hasMany(Branch, { foreignKey: "vendorId", as: "branches" });
    }
  }

  Vendor.init(
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
  return Vendor;
};
