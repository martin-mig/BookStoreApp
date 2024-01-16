const mongoose = require ("mongoose");
const {Schema, model} = mongoose;

const BookSchema = Schema({
    _id: mongoose.ObjectId,
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
