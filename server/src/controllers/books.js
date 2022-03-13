const { tb_books } = require("../../models");

exports.addBook = async (req, res) => {
  try {
    const data = req.body;
    const image = req.files["image"][0].filename;
    const bookFile = req.files["bookFile"][0].filename;
    let { publicationDate } = data;
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getPublicationDate = (time) => {
      const monthIndex = new Date(time).getMonth();
      const year = new Date(time).getFullYear();

      return `${month[monthIndex]} ${year}`;
    };

    const newBook = await tb_books.create({
      ...data,
      image,
      bookFile,
      publicationDate,
    });

    let dataBook = await tb_books.findOne({
      where: {
        id: newBook.id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    dataBook = JSON.parse(JSON.stringify(dataBook));

    dataBook = {
      ...dataBook,
      publicationDate: getPublicationDate(publicationDate),
      image: process.env.IMAGE_PATH + dataBook.image,
      bookFile: process.env.EPUB_PATH + dataBook.bookFile,
    };

    res.send({
      status: "success",
      message: "Add book finished",
      data: {
        book: dataBook,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    let dataBooks = await tb_books.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        books: dataBooks,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBook = async (req, res) => {
  const { id } = req.params;

  try {
    let dataBook = await tb_books.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    dataBook = JSON.parse(JSON.stringify(dataBook));

    dataBook = {
      ...dataBook,
      image: process.env.IMAGE_PATH + dataBook.image,
      bookFile: process.env.EPUB_PATH + dataBook.bookFile,
    };

    res.send({
      status: "success",
      data: {
        book: dataBook,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.editBook = async (req, res) => {
  const { id } = req.params;
  const { title, publicationDate, pages, author, isbn, about } = req.body;

  const image = req.files["image"][0].filename;
  const bookFile = req.files["bookFile"][0].filename;

  try {
    const data = {
      title,
      publicationDate,
      pages,
      author,
      isbn,
      about,
      image,
      bookFile,
    };

    const updateBook = await tb_books.update(data, {
      where: {
        id,
      },
    });

    let updatedBook = await tb_books.findOne({
      where: {
        id,
      },
    });

    updatedBook = JSON.parse(JSON.stringify(updatedBook));

    updatedBook = {
      ...updatedBook,
      image: process.env.IMAGE_PATH + updatedBook.image,
      bookFile: process.env.EPUB_PATH + updatedBook.bookFile,
    };

    res.send({
      status: "success",
      data: {
        book: updatedBook,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await tb_books.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete book with id: ${id} is finished`,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.test = async (req, res) => {
  try {
    const data = req.body;
    let { publicationDate } = data;
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    console.log(data);

    const getPublicationDate = (time) => {
      const monthIndex = new Date(time).getMonth();
      const year = new Date(time).getFullYear();

      return `${month[monthIndex]} ${year}`;
    };

    let newBook = await tb_books.create({
      ...data,
      publicationDate,
    });

    res.send({
      status: "success",
      message: "Add book finished",
      data: {
        book: {
          title: newBook.title,
          publicationDate: getPublicationDate(newBook.publicationDate),
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
