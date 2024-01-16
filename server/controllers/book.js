const bookModel = require("../models/Book")
const employe = require("../models/Employe")
const path = require('path');


const conseguirUsuarios = async (req,res) => {

    let resultmongo = await  employe.find({});
    console.log("Resultado de mongo " + resultmongo);
    res.send(resultmongo);
    return res.end();
}

const editBook = async (req,res) => {
  const modybook = req.body;
  
  console.log("dato a modificar", modybook);

  //const res = await bookModel.updateOne({ _id: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
 /* const rest = await bookModel.updateOne({_id:req.body._id} ,{$set:{title:req.body.title, isbn: req.boody.isbn, pageCount: req.body.pageCount,
                                          publishedDate: req.body.publishedDate, shortDescription: req.bosy.shortDescription, status: req.body.status,
                                          authors: req.body.authors, categories: req.body.categories, stock: req.body.stock }});
   */
  const rest =  await bookModel.updateOne({_id:req.body._id} ,{$set:modybook});
                                        
}

const agregarLibro = async (req,res) => {
    const book = req.body;
  bookModel.create(book)
  .then((documentoGuardado) => {
    console.log('Libro guardado con éxito:', documentoGuardado);
  })
  .catch((error) => {
    console.error('Error al guardar el libro:', error);
  });
  
}

const conseguirLibros = async (req,res) => {
 
    const books = req.body; // Accede a los datos enviados desde el cliente

  // Haz lo que necesites hacer con los datos 'books' aquí
   // console.log("Datos recibidos del cliente:", books);

    const query = {};

    for (const key in books) {
        if (books[key] !== '') {
            query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
        }
    }

    //console.log("Este es el filterobj " + JSON.stringify(filteredObject));

    let resultmongo = await  bookModel.find(query);
    console.log("Resultado de mongo " + resultmongo);

    res.send(resultmongo);
 
    console.log("Esta es la query " + query);
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
    editBook,
}