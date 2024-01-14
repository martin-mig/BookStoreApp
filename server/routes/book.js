const express = require("express");
const router = express.Router();

const BookController = require("../controllers/book");

router.post("/search-books",BookController.conseguirLibros)
router.get("/search-users",BookController.conseguirUsuarios)
router.post("/add-book", BookController.agregarLibro)


module.exports = router;
