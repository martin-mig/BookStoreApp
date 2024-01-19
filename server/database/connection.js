const mongoose = require("mongoose");

const connection = async() =>{
    try{
       await  mongoose.connect("mongodb://localhost:27017/BookStore");
      // await  mongoose.connect("mongodb+srv://admin:admin1234@cluster0.fz58vns.mongodb.net/BookStore");
       console.log("Conectado correctamente a la base de datos");
    }catch(error){
        console.log(error);
        throw new Error('No se ha podido conectar a la base de datos');
    }
}

module.exports = {
    connection
}