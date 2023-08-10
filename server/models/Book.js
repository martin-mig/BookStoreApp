const {Schema, model} = require("mongoose");

const BookSchema = Schema({
    _id: Number,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: Array,
    categories: Array,
});

module.exports = model("Book", BookSchema, "books"); 