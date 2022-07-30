"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branches", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      brandName: { type: Sequelize.STRING, allowNull: false },
      branchName: { type: Sequelize.STRING, unique: true, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      rating: { type: Sequelize.INTEGER, defaultValue: 3, allowNull: false },
      image: { type: Sequelize.STRING },
      status: {
        type: Sequelize.ENUM("open", "closed"),
        defaultValue: "open",
        allowNull: false,
      },
      state: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      street: { type: Sequelize.STRING },
      landmark: { type: Sequelize.STRING },
      isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
      password: { type: Sequelize.STRING, allowNull: false },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "vendors",
          key: "id",
          as: "vendorId",
        },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("branches");
  },
};
