const bookModel = require("../models/Book")
const employe = require("../models/Employe")
const path = require('path');


const conseguirUsuarios = async (req,res) => {

    let resultmongo = await  employe.find({});
    console.log("Resultado de mongo " + resultmongo);
    res.send(resultmongo);
    return res.end();
}

const borrarLibros = async (req, res) => {
  const books = req.body;
  console.log("SERVER: datos a borrar del cliente: ", books);
  
  let idBooksToDelete = {
    _id: {
      $in: []
    }
  };
  books.map((ele) => {
    idBooksToDelete._id.$in.push(ele._id);
  })

  console.log("id de libros a borrar: ", idBooksToDelete.id);

  let result = bookModel.deleteMany(idBooksToDelete)
  .then((documentoGuardado) => {
    console.log('Libro guardado con éxito:', documentoGuardado);
    res.status(200).json({
      ok: true,
      status: 204,
      message: "Libros borrados: " + result.deletedCount
    });
  })
  .catch((error) => {
    console.error('Error al borrar el libro:', error);
  });
}

const editBook = async (req,res) => {
  const modybook = req.body;
  
  console.log("dato a modificar", modybook);

  const rest =  await bookModel.updateOne({_id:req.body._id} ,{$set:modybook});                                  
}

const agregarLibro = async (req,res) => {
  const book = req.body;
  console.log("Este es el book  agregar", book);
  bookModel.create(book)
  .then((documentoGuardado) => {
    console.log('Libro guardado con éxito:', documentoGuardado);
    res.status(201).json({
        ok: true,
        status: 201,
        message: "SERVER: Added Book",
    });
  })
  .catch((error) => {
    console.error('Error al guardar el libro:', error);
  });
}

const conseguirLibros = async (req,res) => {
 
    const books = req.body; // Accede a los datos enviados desde el cliente
    console.log("ESTE ES EL LIBRO ");
   
    const query = {};

    /*for (const key in books) {
        if (books[key] !== '') {
            query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
        }
    }

    console.log("Esta es la query", query);
*/

  for (const key in books) {
    console.log("es la key", key)
    if (books[key] !== '') {
        if (key === 'stock') {
            if (books[key] === 'IN STOCK') {
                query[key] = { $gte: 50 };
            } else if (books[key] === 'LOW STOCK') {
                query[key] = { $gte: 1, $lt: 50 };
            } else if (books[key] === 'OUT OF STOCK') {
                query[key] = 0;
            } else {
                query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
            }
        } else {
            query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
        }
    }
  }

    let resultmongo = await  bookModel.find(query);
    console.log("SERVER: Resultado de mongo " + resultmongo);

    res.send(resultmongo);
 
    console.log("SERVER: Esta es la query: ", query);
    return res.end();
    
    
}

module.exports ={
    conseguirLibros,
    conseguirUsuarios,
    agregarLibro,
    borrarLibros,
    editBook,
}