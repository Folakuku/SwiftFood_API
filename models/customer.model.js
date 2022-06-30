"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate({ Transaction }) {
      this.hasMany(Transaction, {
        foreignKey: "customerId",
        as: "transactions",
      });
    }
  }
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("first_name");
          const newValue = rawValue.charAt(0).toUpperCase() + rawValue.slice(1);
          return rawValue ? newValue : null;
        },
      },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      street: { type: DataTypes.STRING },
      landmark: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: "customers",
      modelName: "Customer",
    }
  );
  return Customer;
};
