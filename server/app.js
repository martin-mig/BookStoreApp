const express = require('express');
const app = express();
const {connection} = require("./database/connection");
const PUERTO = 3002;
const route_book = require("./routes/book");
const cors = require("cors");
const bodyparser = require('body-parser');



app.listen(PUERTO)
console.log('Server on port ' + PUERTO);

//app.use(express.static('public'));

connection();
app.use(cors());

app.use(bodyparser.json());


app.use("/", route_book);