"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "vendors",
      [
        {
          brandName: "dominos pizza",
          email: "giwaolaitan31@gmail.com",
          phone: "080212331",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658410813/dominos%20pizza%20-image.png",
          rating: 5,
          isVerified: true,
          password:
            "$2a$10$EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brandName: "kfc chicken",
          email: "balominah@gmail.com",
          phone: "080212331",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658410907/kfc%20chicken%20-image.jpg",
          rating: 4,
          isVerified: true,
          password:
            "$2a$10$EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brandName: "chicken republic",
          email: "maryamasabi1@gmail.com",
          phone: "080212331",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658411097/chicken%20republic-image.png",
          rating: 3,
          isVerified: true,
          password:
            "$2a$10$EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brandName: "mamaputin",
          email: "mamaputin@gmail.com",
          phone: "080212331",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658411114/mamaputin-image.png",
          rating: 1,
          isVerified: true,
          password:
            "$2a$10$EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("vendors", null, {});
  },
};
