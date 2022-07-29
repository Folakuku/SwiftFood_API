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
        {
          first_name: "Abiola",
          last_name: "Ajibola",
          email: "abiolaajibola955@gmail.com",
          phone: "08116865934",
          state: null,
          city: null,
          street: null,
          landmark: null,
          image: null,
          isVerified: false,
          password:
            "$2a$10$oCbKsGcCaWPZqA0Yr.CYo.Ns0C.CWkX5j.vCnIqA/AgMO2vId4Jcu",
          createdAt: "2022-07-23T22:32:09.133Z",
          updatedAt: "2022-07-23T22:32:09.133Z",
        },
        {
          first_name: "Abdullah",
          last_name: "david",
          email: "oluwati@gmail.com",
          phone: "36873898309409",
          state: null,
          city: null,
          street: null,
          landmark: null,
          image: null,
          isVerified: false,
          password:
            "$2a$10$kFb5b0zOz3D0cLoIVMURzOXyzoY6F9BRfygRjSv6f/14iLI5S3lhS",
          createdAt: "2022-07-23T23:45:23.922Z",
          updatedAt: "2022-07-23T23:45:23.922Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
