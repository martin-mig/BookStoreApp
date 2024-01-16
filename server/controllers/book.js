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

  console.log("id de libros a borrar: ", idBooksToDelete._id);

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

const agregarLibro = async (req,res) => {
    const book = req.body;
    console.log("datos del cliente " + JSON.stringify(book));
    const bookdb = book;//JSON.stringify(book)
    //const resultado = await book.insertOne(JSON.stringify(req.body));
    let newBook = {
      _id: bookdb._id,
      title: bookdb.title,
      isbn : bookdb.isbn,
      pageCount: bookdb.pageCount,
      publishedDate: bookdb.publishedDate,
      shortDescription: bookdb.shortDescription,
      status: bookdb.status,
      authors: [bookdb.authors],
      categories: [bookdb.categories],
      stock: bookdb.stock,
  };

  bookModel.create(newBook)
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

  // Haz lo que necesites hacer con los datos 'books' aquí
    console.log("Datos recibidos del cliente:", books);

    const query = {};

    for (const key in books) {
        if (books[key] !== '') {
            query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
        }
    }

    //console.log("Este es el filterobj " + JSON.stringify(filteredObject));

    let resultmongo = await  bookModel.find(query);
    console.log("SERVER: Resultado de mongo " + resultmongo);

    res.send(resultmongo);
 
    console.log("SERVER: Esta es la query: ", query);
    return res.end();
    
   // let resultmongo = await  Book.find({});
   // console.log("Resultado de mongo " + resultmongo);
   // res.send(resultmongo);
 
    //return res.end();
}

/*const descargarLibros =  async (req,res) => {
  console.log("lleggaaa")
  const inputValue = req.query.inputValue;
  console.log("lo que llega de react " + inputValue);

      selector = '#bodyContent'
      const browser = await puppeteer.launch({
        headless:false,
        slowMo:100
      })
      const page = await browser.newPage();
     //
    
      await page.goto("https://www.wikipedia.org/", {
        waitUntil: "networkidle2",
      });
    
      await page.waitForTimeout(2000);
    
      let searchText = await page.waitForXPath('//*[@id="searchInput"]');
      await searchText.type(inputValue);
    
      await page.waitForXPath(`//*[@id="search-form"]/fieldset/button`, {
        visible: true,
      });
    

      const [search] = await page.$x(`//*[@id="search-form"]/fieldset/button`);
      if (search) {
        await search.click();
        await page.waitForSelector(selector);
    
        const element = await page.$(selector);
      
        const pdfPath = path.join(__dirname, 'wikipedia.pdf');
        
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
        });
        
        
        res.sendFile(pdfPath);
        
        await browser.close(); 
      }
}
*/
module.exports ={
    conseguirLibros,
    conseguirUsuarios,
    agregarLibro,
    borrarLibros
}