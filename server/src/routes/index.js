const express = require("express");

const router = express.Router();

//import authorization
const { register, login, checkAuth } = require("../controllers/auth");
const {
  addBook,
  getBooks,
  getBook,
  editBook,
  deleteBook,
  test,
} = require("../controllers/books");
const { editProfile } = require("../controllers/profiles");
const {
  addTransaction,
  editTransaction,
  getTransaction,
  getTransactions,
  check,
} = require("../controllers/transactions");
const { getUsers, getUser, deleteUser } = require("../controllers/users");

//import middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile, uploadImage } = require("../middlewares/uploadFile");

//set routes
router.post("/register", register);
router.post("/login", login);

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);

router.post("/add-book", auth, uploadFile("image", "bookFile"), addBook);
router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.patch("/book/:id", auth, uploadFile("image", "bookFile"), editBook);
router.delete("/book/:id", auth, deleteBook);

router.post("/transaction", auth, uploadImage("transferProof"), addTransaction);
router.patch("/transaction/:id", auth, editTransaction);
router.get("/transaction/:id", getTransaction);
router.get("/transactions", getTransactions);

router.patch("/edit-profile", auth, uploadImage("image"), editProfile);
router.get("/check", check);
router.post("/test", uploadImage("image"), test);

module.exports = router;
