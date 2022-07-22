"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "customers",
      [
        {
          first_name: "James",
          last_name: "Bond",
          email: "jamesbond@gmail.com",
          phone: "090932244",
          state: "oyo",
          city: "ibadan",
          street: "owo",
          landmark: "challenge",
          image: "image",
          isVerified: true,
          password:
            "$2a$10$EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@gmail.com",
          phone: "090932244",
          state: "rivers",
          city: "port harcourt",
          street: "mile 2",
          landmark: "gra",
          image: "image",
          isVerified: false,
          password:
            "$2a$10$EMPcUB1yhOFTCty6SZCyhO86NxHnCsnhA0ap6Wfgut7raoGMjh9DC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: "Jane",
          last_name: "Doe",
          email: "janedoe@gmail.com",
          phone: "090932244",
          state: "osun",
          city: "osogbo",
          street: "bisi",
          landmark: "igbona",
          image: "image",
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
    await queryInterface.bulkDelete("customers", null, {});
  },
};
