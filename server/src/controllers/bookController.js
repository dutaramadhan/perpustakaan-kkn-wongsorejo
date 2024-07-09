const bookModel = require('../models/bookModel');

const uploadBook = async (req, res) => {
    try {
        if (!req.file || req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ message: 'Only PDF files are allowed' });
        }

        const pdf_content = req.file.buffer;
        const filename = req.file.originalname;

        const existingFile = await bookModel.findOne({ filename: filename });
        if (existingFile) {
            return res.status(409).json({ message: 'Duplicate PDF file detected' });
        }
        else{
            const newBook = new bookModel({
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher,
                category: req.body.category.split(',').map(category => category.trim()),
                filename: filename,
                contentType: req.file.mimetype,
                content: pdf_content
            });
            await newBook.save();
            
            return res.status(201).json({ message: 'PDF book uploaded successfully' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    } 
}

const getFiles = async (req, res) => {
    try {
        const books = await bookModel.find().select('_id title author publisher category');
        
        if (!books || books.length === 0) {
            return res.status(404).json({ error: 'No files exist' });
        }

        return res.json(books);
    } catch (error) {
        console.error('Error fetching files:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getFile = async (req, res) => {
    // const book = await bookModel.findOne({ id: })
    // gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //     if (!file || file.length === 0) {
    //         return res.status(404).json({ error: 'No file exists' });
    //     }
    //     return res.json(file);
    // });
};

const displayFile = async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.set({
            'Content-Type': book.contentType,
            'Content-Disposition': `inline; filename=${book.filename}`
        });

        return res.send(book.content);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    uploadBook,
    getFiles,
    getFile,
    displayFile
};
