const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Branch = sequelize.define("branch", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  brandName: { type: DataTypes.STRING, allowNull: false },
  branchName: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 3, allowNull: false },
  image: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM("open", "closed"),
    defaultValue: "open",
    allowNull: false,
  },
  state: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING },
  landmark: { type: DataTypes.STRING },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  password: { type: DataTypes.STRING, allowNull: false },
  vendorId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = { Branch };
