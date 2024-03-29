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
        {
          brandName: "Mr biggs",
          email: "mrbiggs@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$695AfEXDo5tXvM5yVRXmT./ksCNk3VzLKFfU2w04VWNmuUTnEMhX6",
          createdAt: "2022-07-23T16:07:40.656Z",
          updatedAt: "2022-07-23T16:07:40.656Z",
        },
        {
          brandName: "sizzlers",
          email: "sizzlers@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$xmlP8GU0C5UzmtmEWRnUyeWDKUcApNPBjp81eZV8jbe3R5m9OuQna",
          createdAt: "2022-07-23T16:09:31.028Z",
          updatedAt: "2022-07-23T16:09:31.028Z",
        },
        {
          brandName: "tantalizer",
          email: "tantalizer@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$tOgO19ggSX.PpvoloIZ8deCtXi1/2PrTu9FnWoTv8FbT0gwu7uDXC",
          createdAt: "2022-07-23T16:11:17.535Z",
          updatedAt: "2022-07-23T16:11:17.535Z",
        },
        {
          brandName: "the place",
          email: "theplace@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$RPIqo..ppXwfH9DoQayYP.tR3Ya06P4RyRjS.7nEKx1SnT.Ldp4pa",
          createdAt: "2022-07-23T16:12:07.860Z",
          updatedAt: "2022-07-23T16:12:07.860Z",
        },
        {
          brandName: "sweet sensation",
          email: "sweetsensation@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$PnID/iZBwSYC3MODTYGflu3wX0ozrmWHaWuSEI4i1CD133YjrWOTy",
          createdAt: "2022-07-23T16:12:47.659Z",
          updatedAt: "2022-07-23T16:12:47.659Z",
        },
        {
          brandName: "bukka hut",
          email: "bukkahut@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$otAFIb4YEzAF3OTKVT17ueXIvrClWG17GTbkb/uNAHquxx6tlhoTO",
          createdAt: "2022-07-23T16:13:20.884Z",
          updatedAt: "2022-07-23T16:13:20.884Z",
        },
        {
          brandName: "mama cass",
          email: "mamacass@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$WuTsY6vk7J4GMyPeQC0u1OKJtmgXcWgxDN4v7rXhd7QZ9jAwY7bzK",
          createdAt: "2022-07-23T16:13:48.617Z",
          updatedAt: "2022-07-23T16:13:48.617Z",
        },
        {
          brandName: "savour",
          email: "savour@gmail.com",
          phone: "08021233112",
          image:
            "https://res.cloudinary.com/swiftfoodsng/image/upload/v1659212596/vendor3_imryya.jpg",
          rating: 3,
          isVerified: false,
          password:
            "$2a$10$Rvs05xCBJ0T10fPVeL.d0uqV0DPrfbmGOFgBxNfs9InXU0FuaPrtu",
          createdAt: "2022-07-23T16:14:29.097Z",
          updatedAt: "2022-07-23T16:14:29.097Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("vendors", null, {});
  },
};
