"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Vendors",
      [
        {
          branchName: "Branch",
          email: "branch@gmail.com",
          phone: "080932232",
          state: "Abuja",
          city: "Abuja",
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchName: "Branch2",
          email: "branch@gmail.com",
          phone: "080932232",
          state: "Abuja",
          city: "Abuja",
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          branchName: "Branch3",
          email: "branch@gmail.com",
          phone: "080932232",
          state: "Abuja",
          city: "Abuja",
          password: "EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vendors", null, {});
  },
};
