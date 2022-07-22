"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "branches",
      [
        {
          brandName: "dominos pizza",
          branchName: "dominos atagba",
          email: "giwaolaitan31@gmail.com",
          phone: "080932232",
          rating: 3,
          status: "open",
          state: "oyo",
          city: "ibadan",
          street: "olororo street",
          landmark: "jobele",
          isVerified: true,
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brandName: "kfc chicken",
          branchName: "kfc owode",
          email: "balominah@gmail.com",
          phone: "080932232",
          rating: 5,
          status: "open",
          state: "oyo",
          city: "ibadan",
          street: "dambaba",
          landmark: "joblin",
          isVerified: true,
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brandName: "chicken republic",
          branchName: "chicken rep osogbo",
          email: "maryamasabi1@gmail.com",
          phone: "080932232",
          rating: 4,
          status: "open",
          state: "osun",
          city: "osogbo",
          street: "bisi",
          landmark: "igbona",
          isVerified: true,
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brandName: "mamaputin",
          branchName: "mama osogbo",
          email: "mamaputin@gmail.com",
          phone: "080932232",
          rating: 2,
          status: "open",
          state: "osun",
          city: "osogbo",
          street: "gra",
          landmark: "laro",
          isVerified: true,
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("branches", null, {});
  },
};
