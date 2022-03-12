"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_books.init(
    {
      title: DataTypes.STRING,
      publicationDate: DataTypes.DATE,
      pages: DataTypes.INTEGER,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      about: DataTypes.TEXT,
      bookFile: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tb_books",
    }
  );
  return tb_books;
};
