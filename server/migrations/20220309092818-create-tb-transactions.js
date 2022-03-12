"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tb_users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transferProof: {
        type: Sequelize.STRING,
      },
      remainingActive: {
        type: Sequelize.INTEGER,
      },
      user_status: {
        type: Sequelize.ENUM("Active", "Not Active"),
        defaultValue: "Not Active",
      },
      payment_status: {
        type: Sequelize.ENUM("Pending", "Approve", "Cancel"),
        defaultValue: "Pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_transactions");
  },
};
