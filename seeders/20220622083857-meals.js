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
        {
          name: "bread",
          brandName: "chicken republic",
          price: 3000,
          sellingPrice: 3000,
          description: "Delicious and filling",
          category: ["dish", "snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658589535/bread-image.png",
          status: "available",
          branchId: 3,
          createdAt: "2022-07-23T16:02:35.366Z",
          updatedAt: "2022-07-23T16:02:35.366Z",
        },
        {
          name: "combo pack",
          brandName: "chicken republic",
          price: 5000,
          sellingPrice: 4500,
          description: "Delicious and filling",
          category: ["dish", "snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658588693/combo%20pack-image.png",
          status: "available",
          branchId: 3,
          createdAt: "2022-07-23T16:03:31.704Z",
          updatedAt: "2022-07-23T16:03:31.704Z",
        },
        {
          name: "rice",
          brandName: "chicken republic",
          price: 2000,
          sellingPrice: 2000,
          description: "Delicious and filling",
          category: ["dish"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658341678/rice-image.png",
          status: "available",
          branchId: 3,
          createdAt: "2022-07-23T16:03:57.448Z",
          updatedAt: "2022-07-23T16:03:57.448Z",
        },
        {
          name: "vegen meal",
          brandName: "chicken republic",
          price: 5000,
          sellingPrice: 4500,
          description: "Delicious and filling",
          category: ["dish", "snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658586112/vegen%20meal-image.png",
          status: "available",
          branchId: 3,
          createdAt: "2022-07-23T16:04:46.360Z",
          updatedAt: "2022-07-23T16:04:46.360Z",
        },
        {
          name: "burger combo",
          brandName: "chicken republic",
          price: 5000,
          sellingPrice: 4500,
          description: "Delicious and filling",
          category: ["dish", "snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658586016/burger%20combo-image.png",
          status: "available",
          branchId: 3,
          createdAt: "2022-07-23T16:05:07.405Z",
          updatedAt: "2022-07-23T16:05:07.405Z",
        },
        {
          name: "sandwich",
          brandName: "chicken republic",
          price: 1000,
          sellingPrice: 1000,
          description: "Delicious and filling",
          category: ["dish", "snacks"],
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658585769/sandwich-image.png",
          status: "available",
          branchId: 3,
          createdAt: "2022-07-23T16:05:29.243Z",
          updatedAt: "2022-07-23T16:05:29.243Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("meals", null, {});
  },
};
