"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_myBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_myBooks.belongsTo(models.tb_books, {
        as: "user_book",
        foreignKey: {
          name: "book_id",
        },
      });

      tb_myBooks.belongsTo(models.tb_users, {
        as: "owner_book",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  tb_myBooks.init(
    {
      user_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tb_myBooks",
    }
  );
  return tb_myBooks;
};
