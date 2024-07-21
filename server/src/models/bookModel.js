const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    year: { type: String, required: true},
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    content: {type: Buffer, required: true},
    createdAt: { type: Date, default: Date.now },
    thumbnail: { type: Buffer, required: true}
});

module.exports = mongoose.model('Book', bookSchema);
