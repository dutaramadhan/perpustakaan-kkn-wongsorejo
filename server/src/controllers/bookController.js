const bookModel = require('../models/bookModel');
const { createCanvas } = require('canvas');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const generateThumbnail = async (pdfBuffer) => {
    const uint8Array = new Uint8Array(pdfBuffer);

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };

    await page.render(renderContext).promise;
    return canvas.toBuffer('image/png');
};

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
        
        const thumbnail = await generateThumbnail(pdf_content);

        const newBook = new bookModel({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            year: req.body.year,
            category: req.body.category.split(',').map(category => category.trim()),
            filename: filename,
            contentType: req.file.mimetype,
            content: pdf_content,
            thumbnail: thumbnail
        });
        await newBook.save();
        
        return res.status(201).json({ message: 'PDF book uploaded successfully' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    } 
}

const getFiles = async (req, res) => {
    try {
        const books = await bookModel.find().select('_id title author year thumbnail');

        if (!books || books.length === 0) {
            return res.status(404).json({ error: 'No files exist' });
        }

        const booksWithThumbnails = books.map(book => ({
            ...book.toObject(),
            thumbnail: book.thumbnail.toString('base64')
        }));

        return res.json(booksWithThumbnails);
    } catch (error) {
        console.error('Error fetching files:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getFile = async (req, res) => {
    try {
    const id = req.params.id;

    const book = await bookModel.findById(id).select('_id title author publisher year category thumbnail');
    if (!book || book.length === 0) {
        return res.status(404).json({ error: 'No file exist' });
    }

    const bookWithThumbnails = {
        ...book.toObject(),
        thumbnail: book.thumbnail.toString('base64')
    };

    return res.json(bookWithThumbnails);
    } 
    catch (error) {
        console.error('Error fetching file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editBook = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            year: req.body.year,
            category: req.body.category.split(',').map(category => category.trim()),
        };

        const updatedBook = await bookModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true }).select('_id title author publisher year category');

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        console.error('Error updating book:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteBook = async (req, res) =>{
    try {
        const id = req.params.id;
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error deleting book:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

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

const getBooksByCategory = async (req, res) => {
   try{
    const categoryId = req.params.id;
    const books = await bookModel.find({category: categoryId}).select('_id title author year thumbnail');


    if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for this category' });
    }
    
    const booksWithThumbnails = books.map(book => ({
        ...book.toObject(),
        thumbnail: book.thumbnail.toString('base64')
    }));

    return res.status(200).json(booksWithThumbnails);
   }
   catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
   } 
};

module.exports = {
    uploadBook,
    getFiles,
    getFile,
    editBook,
    deleteBook,
    displayFile,
    getBooksByCategory
};
