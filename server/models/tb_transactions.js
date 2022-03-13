"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_transactions.belongsTo(models.tb_users, {
        as: "purchaser",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  tb_transactions.init(
    {
      user_id: DataTypes.INTEGER,
      transferProof: DataTypes.STRING,
      remainingActive: DataTypes.DATE,
      user_status: DataTypes.ENUM("Active", "Not Active"),
      payment_status: DataTypes.ENUM("Pending", "Approve", "Cancel"),
    },
    {
      sequelize,
      modelName: "tb_transactions",
    }
  );
  return tb_transactions;
};
