"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "meals",
      [
        {
          name: "pizza",
          brandName: "dominos pizza",
          price: 3000,
          sellingPrice: 2500,
          description: "Simple and sweet",
          category: ["snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658411229/pizza-image.jpg",
          status: "available",
          branchId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "baked chicken",
          brandName: "kfc chicken",
          price: 2000,
          sellingPrice: 2000,
          description: "Simple and sweet",
          category: ["snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658342973/baked%20chicken-image.png",
          status: "available",
          branchId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "jollof rice",
          brandName: "mamaputin",
          price: 3000,
          sellingPrice: 2500,
          description: "Simple and sweet",
          category: ["dish"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658343083/jollof%20rice-image.png",
          status: "available",
          branchId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "chips",
          brandName: "chicken republic",
          price: 2500,
          sellingPrice: 2500,
          description: "Simple and sweet",
          category: ["snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658343219/chips-image.png",
          status: "unavailable",
          branchId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "spaghetti",
          brandName: "chicken republic",
          price: 3500,
          sellingPrice: 3500,
          description: "Simple and sweet",
          category: ["dish"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658343660/spaghetti-image.png",
          status: "available",
          branchId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "chicken",
          brandName: "kfc chicken",
          price: 2000,
          sellingPrice: 2000,
          description: "Simple and sweet",
          category: ["snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658340324/s6pmvtrbupr9v7v2sogj.png",
          status: "available",
          branchId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("meals", null, {});
  },
};
