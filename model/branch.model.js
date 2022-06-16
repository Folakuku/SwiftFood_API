const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.config");

const Branch = sequelize.define("Branch", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 3, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM("open", "closed"), allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Branch };
