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
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658410813/dominos%20pizza%20-image.png",
          status: "open",
          state: "oyo",
          city: "ibadan",
          street: "olororo street",
          landmark: "jobele",
          isVerified: true,
          password:
            "$2a$10$Rvs05xCBJ0T10fPVeL.d0uqV0DPrfbmGOFgBxNfs9InXU0FuaPrtu",
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
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658410907/kfc%20chicken%20-image.jpg",
          status: "open",
          state: "oyo",
          city: "ibadan",
          street: "dambaba",
          landmark: "joblin",
          isVerified: true,
          password:
            "$2a$10$Rvs05xCBJ0T10fPVeL.d0uqV0DPrfbmGOFgBxNfs9InXU0FuaPrtu",
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
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658411097/chicken%20republic-image.png",
          status: "open",
          state: "osun",
          city: "osogbo",
          street: "bisi",
          landmark: "igbona",
          isVerified: true,
          password:
            "$2a$10$Rvs05xCBJ0T10fPVeL.d0uqV0DPrfbmGOFgBxNfs9InXU0FuaPrtu",
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
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1658411114/mamaputin-image.png",
          status: "open",
          state: "osun",
          city: "osogbo",
          street: "gra",
          landmark: "laro",
          isVerified: true,
          password:
            "$2a$10$Rvs05xCBJ0T10fPVeL.d0uqV0DPrfbmGOFgBxNfs9InXU0FuaPrtu",
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
