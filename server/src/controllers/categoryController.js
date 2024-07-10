const categoryModel = require('../models/categoryModel');

const addCategory = async (req, res)=> {
    try{
        const newCategory = new categoryModel({
            data: req.body.data,
        });
        await newCategory.save();
        return res.status(201).json({ message: 'Category added successfully' });
    }
    catch(err){
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategory = async (req, res)=> {
    try{
        const id = req.params.id;
        const category = await categoryModel.findById(id).select('_id data');
        
        if (!category || category.length === 0) {
            return res.status(404).json({ error: 'No category exist' });
        }

        return res.json(category);    
    }
    catch(err){
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategories = async (req, res)=> {
    try{
        const categories = await categoryModel.find();
        
        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: 'No category exist' });
        }

        return res.json(categories);    
    }
    catch(err){
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCategory = async (req, res) =>{
    try {
        const id = req.params.id;
        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error('Error deleting category:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { data: req.body.data },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (err) {
        console.error('Error updating category:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addCategory,
    getCategory,
    getCategories,
    deleteCategory,
    editCategory,
}