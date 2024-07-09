const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    category: [{ type: String, required: true }],
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    content: {type: Buffer, required: true}
});

module.exports = mongoose.model('Book', bookSchema);
