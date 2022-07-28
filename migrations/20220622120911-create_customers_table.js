"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("first_name");
          const newValue = rawValue.charAt(0).toUpperCase() + rawValue.slice(1);
          return rawValue ? newValue : null;
        },
      },
      last_name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      phone: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      street: { type: Sequelize.STRING },
      landmark: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
      password: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
  },
};
