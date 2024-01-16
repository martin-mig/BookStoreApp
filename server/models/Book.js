const mongoose = require ("mongoose");
const {Schema, model} = mongoose;

const BookSchema = Schema({
    _id: mongoose.ObjectId,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    shortDescription: String,
    status: String,
    stock: Number,
    authors: Array,
    categories: Array,
});

module.exports = model("Book", BookSchema, "books"); 
