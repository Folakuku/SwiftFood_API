"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sales_histories",
      [
        {
          branchId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sales_histories", null, {});
  },
};
