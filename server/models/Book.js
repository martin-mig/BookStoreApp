const {Schema, model} = require("mongoose");

const BookSchema = Schema({
    _id: Number,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    stock: Number,
    shortDescription: String,
    status: String,
    authors: Array,
    categories: Array,
});

module.exports = model("Book", BookSchema, "books"); 
