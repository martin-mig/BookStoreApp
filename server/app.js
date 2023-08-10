const express = require('express');
const app = express();
const {connection} = require("./database/connection");
const PUERTO = 3001;
const route_book = require("./routes/book");
const cors = require("cors");

app.listen(PUERTO)
console.log('Server on port 3001');

//app.use(express.static('public'));

connection();
app.use(cors());

app.use("/", route_book);