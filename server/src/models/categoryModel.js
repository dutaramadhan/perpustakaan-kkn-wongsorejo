const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    data: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
