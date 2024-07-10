const express = require('express');
const middleware = require('../middleware/bookMiddleware');
const { addCategory, getCategory, getCategories, deleteCategory, editCategory } = require('../controllers/categoryController');

const router = express.Router();

// @route POST /add
router.post('/add', middleware.verifyApiKey, addCategory);

// @route GET /category
router.get('/:id', middleware.verifyApiKey, getCategory);

// @route GET /categories
router.get('/', middleware.verifyApiKey, getCategories);

// @route DELETE /category/:id
router.delete('/delete/:id', middleware.verifyApiKey, deleteCategory);

// @route PUT /category/:id
router.put('/edit/:id', middleware.verifyApiKey, editCategory);

module.exports = router;