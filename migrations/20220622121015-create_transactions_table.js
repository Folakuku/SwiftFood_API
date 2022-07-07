"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // date: {
      //   type: Sequelize.DATE,
      //   defaultValue: Sequelize.NOW,
      //   allowNull: false,
      // },
      total: { type: Sequelize.FLOAT, allowNull: false },
      status: {
        type: Sequelize.ENUM("pending", "successful", "cancelled"),
        defaultValue: "pending",
      },
      customerId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
