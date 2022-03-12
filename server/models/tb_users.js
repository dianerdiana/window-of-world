"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_users.hasOne(models.tb_profiles, {
        as: "profile",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  tb_users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      role: DataTypes.ENUM("user", "admin"),
      subscribe: DataTypes.ENUM("subscribed", "not subscribed"),
    },
    {
      sequelize,
      modelName: "tb_users",
    }
  );
  return tb_users;
};
