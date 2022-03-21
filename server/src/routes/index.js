const express = require("express");

const router = express.Router();

let CronJob = require("cron").CronJob;

//import authorization
const { register, login, checkAuth } = require("../controllers/auth");
const {
  addBook,
  getBooks,
  getBook,
  editBook,
  deleteBook,
} = require("../controllers/books");
const { addMyBook, getMyBooks, isMyBook } = require("../controllers/my-books");
const { editProfile } = require("../controllers/profiles");
const {
  addTransaction,
  editTransaction,
  getTransaction,
  getTransactions,
  updateRemainingActive,
} = require("../controllers/transactions");
const { getUsers, getUser, deleteUser } = require("../controllers/users");

//import middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile, uploadImage } = require("../middlewares/uploadFile");

//set routes
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

router.get("/users", getUsers);
router.get("/user", auth, getUser);
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
router.get("/remaining-active", updateRemainingActive);

router.patch("/edit-profile", auth, uploadImage("image"), editProfile);

router.post("/add-my-book/:id", auth, addMyBook);
router.get("/my-books", auth, getMyBooks);
router.get("/is-my-book/:id", auth, isMyBook);

let job = new CronJob(
  "00 00 00 * * *",
  async () => {
    await updateRemainingActive();

    console.log("Update success");
  },
  null,
  true,
  "Asia/Jakarta"
);

job.start();

module.exports = router;
