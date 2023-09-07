const Book = require("../models/Book")

const prueba = (req, res) => {
    console.log("llegaprueba");
    return res.status(200).json({
        mensaje: "Prueba en el controller de librosggggg"
    })
}

const conseguirLibros = async (req,res) => {
    console.log("llega nuevo");
 
    const books = req.body; // Accede a los datos enviados desde el cliente

  // Haz lo que necesites hacer con los datos 'books' aquí
    console.log("Datos recibidos del cliente:", books);

    const query = {};

    for (const key in books) {
        if (books[key] !== '') {
            query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
        }
    }

    //console.log("Este es el filterobj " + JSON.stringify(filteredObject));

    let resultmongo = await  Book.find(query);
    console.log("Resultado de mongo " + resultmongo);

    res.send(resultmongo);
 
    console.log("Esta es la query " + query);
    return res.end();

   // let resultmongo = await  Book.find({});
   // console.log("Resultado de mongo " + resultmongo);
   // res.send(resultmongo);
 
    //return res.end();
}

module.exports ={
    prueba,
    conseguirLibros
}