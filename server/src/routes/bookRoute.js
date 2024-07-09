const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const middleware = require('../middleware/bookMiddleware');
const { uploadBook, getFiles, getFile, displayFile } = require('../controllers/bookController');

const router = express.Router();

// @route POST /upload
// @desc Uploads file to DB
router.post('/upload', middleware.verifyApiKey, upload.single('file'), uploadBook);

// @route GET /files
// @desc Display all files in JSON
router.get('/files', middleware.verifyApiKey, getFiles);

// @route GET /files/:filename
// @desc Display single file object
router.get('/files/:filename', middleware.verifyApiKey, getFile);

// @route GET /file/:filename
// @desc Display PDF file
router.get('/file/:id', middleware.verifyApiKey, displayFile);

module.exports = router;