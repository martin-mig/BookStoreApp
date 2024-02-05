const express = require("express");
const router = express.Router();

const BookController = require("../controllers/book");
const multerMiddleware = require('../middleware/multerMiddleware');

router.post("/search-books",BookController.conseguirLibros)
router.get("/search-users",BookController.conseguirUsuarios)
router.post("/add-book", BookController.agregarLibro)
router.delete("/delete-books", BookController.borrarLibros)
router.put("/edit-book", BookController.editBook)
router.post("/api/upload", multerMiddleware, BookController.subirImagen)

module.exports = router;
