"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Branches",
      [
        {
          branchName: "Branch",
          brandName: "sweeter",
          email: "branch@gmail.com",
          phone: "080932232",
          state: "Abuja",
          city: "Abuja",
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchName: "Branch2",
          brandName: "sweeter",
          email: "branch@gmail.com",
          phone: "080932232",
          state: "Abuja",
          city: "Abuja",
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchName: "Branch4",
          brandName: "food",
          email: "branch@gmail.com",
          phone: "080932232",
          state: "Abuja",
          city: "Abuja",
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchName: "Branch5",
          brandName: "food",
          email: "branch2@gmail.com",
          phone: "080932232",
          state: "Abuja",
          city: "Abuja",
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          vendorId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Branches", null, {});
  },
};
