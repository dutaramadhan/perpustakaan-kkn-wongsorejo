const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const middleware = require('../middleware/bookMiddleware');
const { uploadBook, getFiles, getFile, editBook, deleteBook, displayFile, getBooksByCategory } = require('../controllers/bookController');

const router = express.Router();

// @route POST /upload
// @desc Uploads file to DB
router.post('/upload', middleware.verifyApiKey, upload.single('file'), uploadBook);

// @route GET /files
// @desc Display all files in JSON
router.get('/files', middleware.verifyApiKey, getFiles);

// @route GET /files/:id
// @desc Display single file object
router.get('/files/:id', middleware.verifyApiKey, getFile);

// @route PUT /files/:id
// @desc Edit single file data
router.put('/files/:id', middleware.verifyApiKey, editBook);

// @route DELETE /files/:id
// @desc Edit single file data
router.delete('/files/:id', middleware.verifyApiKey, deleteBook);

// @route GET /file/:filename
// @desc Display PDF file
router.get('/file/:id', displayFile);

// @route GET /files/category/:id
// @desc get books by category
router.get('/files/categories/:id', middleware.verifyApiKey, getBooksByCategory);

module.exports = router;