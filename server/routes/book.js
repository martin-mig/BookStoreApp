const express = require("express");
const router = express.Router();

const BookController = require("../controllers/book");

router.get("/ruta-prueba", BookController.prueba);
//router.get("/search-books",BookController.conseguirLibros);

router.post("/search-books",BookController.conseguirLibros)

module.exports = router;
