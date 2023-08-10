const Book = require("../models/Book")

const prueba = (req, res) => {
    console.log("llegaprueba");
    return res.status(200).json({
        mensaje: "Prueba en el controller de librosggggg"
    })
}

const conseguirLibros = async (req,res) => {
    console.log("llega");
 
    let resultmongo = await  Book.find({});
    console.log("Resultado de mongo " + resultmongo);
    res.send(resultmongo);
  //  res.write(JSON.stringify(resultmongo)); 
    return res.end();
}

module.exports ={
    prueba,
    conseguirLibros
}