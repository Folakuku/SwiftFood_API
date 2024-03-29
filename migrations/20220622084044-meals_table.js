"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("meals", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      brandName: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.FLOAT, allowNull: false },
      sellingPrice: { type: Sequelize.FLOAT, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      category: { type: Sequelize.ARRAY(Sequelize.STRING) },
      image: { type: Sequelize.STRING, allowNull: false },
      status: {
        type: Sequelize.ENUM("available", "unavailable"),
        defaultValue: "available",
      },
      branchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "branches",
          key: "id",
          as: "branchId",
        },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("meals");
  },
};
