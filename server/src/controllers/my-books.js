const { tb_users, tb_books, tb_myBooks } = require("../../models");
const { Op } = require("sequelize");

exports.addMyBook = async (req, res) => {
  const user_id = req.user.id;
  const book_id = req.params.id;
  try {
    const addBook = await tb_myBooks.create({ user_id, book_id });

    const myBook = await tb_myBooks.findOne({
      where: {
        user_id,
      },
      include: [
        {
          model: tb_users,
          as: "owner_book",
          attributes: {
            exclude: [
              "password",
              "role",
              "subscribe",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: tb_books,
          as: "user_book",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt", "user_id", "book_id"],
      },
    });

    res.send({
      status: "success",
      data: myBook,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMyBooks = async (req, res) => {
  const user_id = req.user.id;
  try {
    const myBooks = await tb_myBooks.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: tb_users,
          as: "owner_book",
          attributes: {
            exclude: [
              "password",
              "role",
              "subscribe",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: tb_books,
          as: "user_book",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt", "user_id", "book_id"],
      },
    });

    res.send({
      status: "success",
      data: {
        myBooks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.isMyBook = async (req, res) => {
  const user_id = req.user.id;
  const book_id = req.params.id;
  try {
    const myBook = await tb_myBooks.findOne({
      where: {
        [Op.and]: [{ user_id }, { book_id }],
      },
      include: [
        {
          model: tb_users,
          as: "owner_book",
          attributes: {
            exclude: [
              "password",
              "role",
              "subscribe",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: tb_books,
          as: "user_book",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt", "user_id", "book_id"],
      },
    });

    res.send({
      status: "success",
      data: {
        myBook,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
