"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branch_ratings", {
      authorName: { type: Sequelize.STRING, allowNull: false },
      rating: { type: Sequelize.SMALLINT, allowNull: false },
      review: { type: Sequelize.TEXT },
      branchId: { type: Sequelize.INTEGER, allowNull: false },
      customerId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("branch_ratings");
  },
};
