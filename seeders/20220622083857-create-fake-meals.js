"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Meals",
      [
        {
          name: "Beans",
          brandName: "sweet2",
          price: "200",
          discount: "0",
          description: "Simple and sweet",
          category: "snack",
          image: "image",
          branchId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pounded yam",
          brandName: "sweet2",
          price: "200",
          discount: "0",
          description: "Simple and sweet",
          category: "snack",
          image: "image",
          branchId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Potato",
          brandName: "sweet1",
          price: "200",
          discount: "0",
          description: "Simple and sweet",
          category: "snack",
          image: "image",
          branchId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bread",
          brandName: "sweet1",
          price: "200",
          discount: "0",
          description: "Simple and sweet",
          category: "snack",
          image: "image",
          branchId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Amala",
          brandName: "sweet1",
          price: "200",
          discount: "0",
          description: "Simple and sweet",
          category: "snack",
          image: "image",
          branchId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rice",
          brandName: "sweet1",
          price: "200",
          discount: "0",
          description: "Simple and sweet",
          category: "snack",
          image: "image",
          branchId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Meals", null, {});
  },
};
