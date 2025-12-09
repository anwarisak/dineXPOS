import Category from "../models/categoryModel.js";

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ deleted: 0 });
    if (!categories) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get one category by ID
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id, deleted: 0 });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new category
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({
      $or: [{ name }, { description }],
    });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const newCategory = await Category.create({ name, description });
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a category by ID
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { deleted: 1 },
      { new: true }
    );

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
